
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  nickname text not null default '',
  birthday date,
  focus text not null default '',
  experience text not null default '',
  project_goal text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists first_name text not null default '',
  add column if not exists last_name text not null default '',
  add column if not exists nickname text not null default '',
  add column if not exists birthday date,
  add column if not exists focus text not null default '',
  add column if not exists experience text not null default '',
  add column if not exists project_goal text not null default '',
  add column if not exists updated_at timestamptz not null default now();

alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create table if not exists public.tool_suggestions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 60),
  category text not null check (char_length(category) between 2 and 50),
  website text not null check (char_length(website) <= 240),
  description text not null check (char_length(description) between 10 and 500),
  reason text not null check (char_length(reason) between 10 and 500),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.tool_suggestions enable row level security;
revoke all on public.tool_suggestions from anon, authenticated;
grant insert (user_id, name, category, website, description, reason)
on public.tool_suggestions to authenticated;

drop policy if exists "Signed-in users can suggest tools" on public.tool_suggestions;
create policy "Signed-in users can suggest tools"
on public.tool_suggestions for insert
to authenticated
with check (auth.uid() = user_id);

create table if not exists public.approved_tools (
  id text primary key,
  suggestion_id bigint unique references public.tool_suggestions(id) on delete set null,
  name text not null check (char_length(name) between 2 and 60),
  category text not null check (char_length(category) between 2 and 50),
  website text not null check (char_length(website) between 1 and 240 and website ~* '^https?://'),
  description text not null check (char_length(description) between 10 and 500),
  created_at timestamptz not null default now()
);

create unique index if not exists approved_tools_name_lower_idx
on public.approved_tools (lower(name));

alter table public.approved_tools enable row level security;
revoke all on public.approved_tools from public, anon, authenticated;
grant select on public.approved_tools to anon, authenticated;

drop policy if exists "Anyone can view approved tools" on public.approved_tools;
create policy "Anyone can view approved tools"
on public.approved_tools for select
to anon, authenticated
using (true);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, nickname, birthday)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'nickname', ''),
    nullif(new.raw_user_meta_data ->> 'birthday', '')::date
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.create_profile_for_new_user();

create table if not exists public.community_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.community_admins enable row level security;
revoke all on public.community_admins from anon, authenticated;

create or replace function public.is_community_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.community_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_community_admin() from public, anon;
grant execute on function public.is_community_admin() to authenticated;

grant select on public.tool_suggestions to authenticated;

drop policy if exists "Admins can view tool suggestions" on public.tool_suggestions;
create policy "Admins can view tool suggestions"
on public.tool_suggestions for select
to authenticated
using ((select public.is_community_admin()));

create or replace function public.review_tool_suggestion(suggestion_id bigint, decision text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  suggestion public.tool_suggestions%rowtype;
  approved_tool_id text;
begin
  if not public.is_community_admin() then
    raise exception 'Only community admins can review tool suggestions.'
      using errcode = '42501';
  end if;

  if decision is null or decision not in ('approved', 'rejected') then
    raise exception 'Decision must be approved or rejected.'
      using errcode = '22023';
  end if;

  select *
  into suggestion
  from public.tool_suggestions
  where id = suggestion_id
  for update;

  if not found then
    raise exception 'Tool suggestion was not found.'
      using errcode = 'P0002';
  end if;

  if suggestion.status <> 'pending' then
    raise exception 'Tool suggestion has already been reviewed.'
      using errcode = 'P0001';
  end if;

  if decision = 'approved' then
    if suggestion.website !~* '^https?://' then
      raise exception 'The website must use HTTP or HTTPS.'
        using errcode = '22023';
    end if;

    if exists (
      select 1
      from public.approved_tools
      where lower(name) = lower(suggestion.name)
    ) then
      raise exception 'This tool is already in the approved catalog.'
        using errcode = '23505';
    end if;

    approved_tool_id := 'approved-' || suggestion.id::text;
    insert into public.approved_tools (id, suggestion_id, name, category, website, description)
    values (
      approved_tool_id,
      suggestion.id,
      suggestion.name,
      suggestion.category,
      suggestion.website,
      suggestion.description
    );
  end if;

  update public.tool_suggestions
  set status = decision
  where id = suggestion.id;

  return coalesce(approved_tool_id, 'rejected');
end;
$$;

revoke all on function public.review_tool_suggestion(bigint, text) from public, anon;
grant execute on function public.review_tool_suggestion(bigint, text) to authenticated;

create table if not exists public.community_stickers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_name text not null check (char_length(tool_name) between 2 and 60),
  project text not null check (char_length(project) between 2 and 120),
  usage text not null check (char_length(usage) between 10 and 300),
  message text not null check (char_length(message) between 10 and 500),
  image_path text,
  created_at timestamptz not null default now()
);

alter table public.community_stickers enable row level security;
revoke all on public.community_stickers from anon, authenticated;
grant select on public.community_stickers to anon, authenticated;
grant insert, delete on public.community_stickers to authenticated;

drop policy if exists "Anyone can read community stickers" on public.community_stickers;
create policy "Anyone can read community stickers"
on public.community_stickers for select
to anon, authenticated
using (true);

drop policy if exists "Users can create their own community stickers" on public.community_stickers;
create policy "Users can create their own community stickers"
on public.community_stickers for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and (
    image_path is null
    or (storage.foldername(image_path))[1] = (select auth.uid())::text
  )
);

drop policy if exists "Admins can delete community stickers" on public.community_stickers;
create policy "Admins can delete community stickers"
on public.community_stickers for delete
to authenticated
using ((select public.is_community_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'community-stickers',
  'community-stickers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view community sticker images" on storage.objects;
create policy "Anyone can view community sticker images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'community-stickers');

drop policy if exists "Users can upload their own community sticker images" on storage.objects;
create policy "Users can upload their own community sticker images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'community-stickers'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Admins can delete community sticker images" on storage.objects;
create policy "Admins can delete community sticker images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'community-stickers'
  and (select public.is_community_admin())
);

drop policy if exists "Users can clean up unlinked community sticker images" on storage.objects;
create policy "Users can clean up unlinked community sticker images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'community-stickers'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and not exists (
    select 1
    from public.community_stickers as sticker
    where sticker.image_path = storage.objects.name
  )
);
