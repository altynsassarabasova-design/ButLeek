(function () {
    'use strict';

    const form = document.getElementById('community-form');
    const wall = document.getElementById('community-wall');
    const status = document.getElementById('community-status');
    const loginNote = document.getElementById('community-login-note');
    const message = document.getElementById('community-form-message');
    const maxImageBytes = 5 * 1024 * 1024;
    const imageTypes = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp'
    };

    if (!form || !wall || !status) return;

    function tr(key, fallback, values) {
        return window.butleekTranslate
            ? window.butleekTranslate(key, values)
            : fallback;
    }

    function setMessage(node, text, isError) {
        node.textContent = text;
        node.className = isError ? 'form-message is-error' : 'form-message is-ok';
    }

    function createText(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        node.textContent = text;
        return node;
    }

    function imageUrl(client, imagePath) {
        if (!imagePath) return '';
        return client.storage.from('community-stickers').getPublicUrl(imagePath).data.publicUrl;
    }

    function renderWall(posts, client, isAdmin) {
        wall.textContent = '';
        if (!posts.length) {
            wall.appendChild(createText('p', 'empty-note', tr('community.empty', 'Пока нет историй. Поделитесь первой!')));
            return;
        }

        posts.forEach(function (post, index) {
            const sticker = document.createElement('article');
            sticker.className = 'community-sticker community-sticker-' + (index % 3);

            const header = document.createElement('div');
            header.className = 'community-sticker-header';
            const date = new Date(post.created_at);
            const locale = window.butleekLanguage === 'kk' ? 'kk-KZ' :
                (window.butleekLanguage === 'en' ? 'en' : 'ru-RU');
            const formattedDate = Number.isNaN(date.getTime())
                ? ''
                : new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
            header.appendChild(createText('span', 'community-author', tr('community.member', 'Участник сообщества')));
            header.appendChild(createText('time', 'community-date', formattedDate));
            if (formattedDate) header.lastChild.dateTime = date.toISOString();
            sticker.appendChild(header);

            sticker.appendChild(createText('span', 'community-detail-label', tr('community.toolLabel', 'Инструмент')));
            sticker.appendChild(createText('h3', 'community-sticker-title', post.tool_name));
            const project = document.createElement('p');
            project.className = 'community-project';
            const projectLabel = createText('span', 'community-detail-label', tr('community.projectLabel', 'Проект'));
            project.appendChild(projectLabel);
            project.appendChild(document.createTextNode(': ' + post.project));
            sticker.appendChild(project);
            sticker.appendChild(createText('h4', '', tr('community.usageLabel', 'Как использую')));
            sticker.appendChild(createText('p', 'community-sticker-copy', post.usage));
            sticker.appendChild(createText('h4', 'community-comment-label', tr('community.commentLabel', 'Комментарий')));
            sticker.appendChild(createText('p', 'community-sticker-message', post.message));

            if (post.image_path) {
                const image = document.createElement('img');
                image.className = 'community-photo';
                image.src = imageUrl(client, post.image_path);
                image.alt = tr('community.photoAlt', 'Фото проекта для {tool}', { tool: post.tool_name });
                image.loading = 'lazy';
                image.onerror = function () {
                    image.hidden = true;
                };
                sticker.appendChild(image);
            }

            if (isAdmin) {
                const remove = document.createElement('button');
                remove.className = 'text-btn community-delete';
                remove.type = 'button';
                remove.textContent = tr('community.delete', 'Удалить стикер');
                remove.addEventListener('click', function () {
                    removeSticker(client, post, remove);
                });
                sticker.appendChild(remove);
            }

            wall.appendChild(sticker);
        });
    }

    async function loadWall(client, isAdmin) {
        const { data, error } = await client
            .from('community_stickers')
            .select('id, tool_name, project, usage, message, image_path, created_at')
            .order('created_at', { ascending: false })
            .limit(60);
        if (error) throw error;
        renderWall(data || [], client, isAdmin);
        status.textContent = '';
    }

    async function removeSticker(client, post, button) {
        if (!window.confirm(tr('community.deleteConfirm', 'Удалить эту публикацию? Это действие нельзя отменить.'))) return;
        button.disabled = true;
        try {
            const { data, error } = await client
                .from('community_stickers')
                .delete()
                .eq('id', post.id)
                .select('image_path')
                .maybeSingle();
            if (error) throw error;
            if (!data) throw new Error('Community sticker was not deleted.');

            let imageCleanupFailed = false;
            if (data.image_path) {
                const { error: imageError } = await client.storage
                    .from('community-stickers')
                    .remove([data.image_path]);
                if (imageError) {
                    console.error('Не удалось удалить изображение стикера.', imageError);
                    imageCleanupFailed = true;
                }
            }

            await loadWall(client, true);
            status.textContent = imageCleanupFailed
                ? tr('community.imageCleanupFailed', 'Публикация удалена, но изображение не удалось очистить. Сообщите администратору.')
                : tr('community.deleteSuccess', 'Публикация удалена.');
        } catch (error) {
            console.error('Не удалось удалить публикацию сообщества.', error);
            setMessage(status, tr('community.deleteFailed', 'Не удалось удалить публикацию.'), true);
            button.disabled = false;
        }
    }

    async function initialize() {
        try {
            const client = window.butleekSupabase || await window.butleekSupabaseReady;
            if (!client) {
                setMessage(status, tr('community.unavailable', 'Стена сообщества недоступна: проверьте подключение к Supabase.'), true);
                return;
            }

            const { data: sessionData, error: sessionError } = await client.auth.getSession();
            if (sessionError) throw sessionError;
            const session = sessionData.session;
            form.hidden = !session;
            loginNote.hidden = !!session;

            let isAdmin = false;
            if (session) {
                const { data, error } = await client.rpc('is_community_admin');
                if (error) {
                    console.error('Не удалось проверить роль администратора.', error);
                } else {
                    isAdmin = data === true;
                }
            }

            await loadWall(client, isAdmin);
        } catch (error) {
            console.error('Не удалось загрузить стену сообщества.', error);
            setMessage(status, tr('community.loadError', 'Не удалось загрузить стену. Обновите страницу и попробуйте ещё раз.'), true);
        }
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        message.textContent = '';
        const fileInput = form.elements.photo;
        const file = fileInput.files[0] || null;
        if (file && !imageTypes[file.type]) {
            setMessage(message, tr('community.photoType', 'Выберите изображение в формате JPG, PNG или WebP.'), true);
            return;
        }
        if (file && file.size > maxImageBytes) {
            setMessage(message, tr('community.photoSize', 'Размер изображения не должен превышать 5 МБ.'), true);
            return;
        }

        const client = window.butleekSupabase;
        if (!client) {
            setMessage(message, tr('community.unavailable', 'Стена сообщества недоступна: проверьте подключение к Supabase.'), true);
            return;
        }

        const submit = form.querySelector('button[type="submit"]');
        submit.disabled = true;
        let uploadedPath = null;
        try {
            const { data: sessionData, error: sessionError } = await client.auth.getSession();
            if (sessionError) throw sessionError;
            if (!sessionData.session) {
                setMessage(message, tr('community.login', 'Войдите, чтобы поделиться своей историей.'), true);
                return;
            }

            if (file) {
                uploadedPath = sessionData.session.user.id + '/' + crypto.randomUUID() + '.' + imageTypes[file.type];
                const { error: uploadError } = await client.storage
                    .from('community-stickers')
                    .upload(uploadedPath, file, {
                        cacheControl: '3600',
                        contentType: file.type,
                        upsert: false
                    });
                if (uploadError) throw uploadError;
            }

            const { error } = await client.from('community_stickers').insert({
                user_id: sessionData.session.user.id,
                tool_name: form.elements.toolName.value.trim(),
                project: form.elements.project.value.trim(),
                usage: form.elements.usage.value.trim(),
                message: form.elements.message.value.trim(),
                image_path: uploadedPath
            });
            if (error) throw error;

            form.reset();
            setMessage(message, tr('community.publishSuccess', 'Стикер опубликован.'), false);
            await initialize();
        } catch (error) {
            console.error('Не удалось опубликовать стикер сообщества.', error);
            if (uploadedPath) {
                try {
                    const { error: cleanupError } = await client.storage
                        .from('community-stickers')
                        .remove([uploadedPath]);
                    if (cleanupError) console.error('Не удалось очистить незавершённое изображение.', cleanupError);
                } catch (cleanupError) {
                    console.error('Не удалось очистить незавершённое изображение.', cleanupError);
                }
            }
            setMessage(message, tr('community.publishFailed', 'Не удалось опубликовать. Проверьте подключение и настройки Supabase.'), true);
        } finally {
            submit.disabled = false;
        }
    });

    initialize();
})();
