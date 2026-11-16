(() => {
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_ANON_KEY;
  const configured = url && key && !url.includes("ВСТАВЬТЕ") && !key.includes("ВСТАВЬТЕ");
  let client = configured && window.supabase
    ? window.supabase.createClient(url, key)
    : null;
  let clientLoadFailed = false;

  function loadSupabaseClient() {
    if (!configured || client) return Promise.resolve(client);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        script.remove();
        reject(new Error("Supabase library loading timed out."));
      }, 10000);
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timeout);
        try {
          if (!window.supabase) throw new Error("Supabase library did not expose a client.");
          resolve(window.supabase.createClient(url, key));
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("Supabase library could not be loaded."));
      };
      document.head.appendChild(script);
    });
  }

  const clientReady = loadSupabaseClient()
    .catch((error) => {
      clientLoadFailed = true;
      console.error("Не удалось загрузить Supabase.", error);
      return null;
    })
    .then((loadedClient) => {
      client = loadedClient;
      window.butleekSupabase = client;
      return client;
    });
  window.butleekSupabase = client;
  window.butleekSupabaseReady = clientReady;

  const unavailableMessage = () => {
    if (!configured) return uiText("auth.notConfigured", "Авторизация не настроена. Заполните URL проекта и публичный ключ Supabase.");
    if (clientLoadFailed) return uiText("auth.libraryUnavailable", "Не удалось загрузить библиотеку авторизации. Проверьте подключение к интернету.");
    return uiText("auth.connecting", "Подключаем авторизацию. Подождите немного и попробуйте ещё раз.");
  };

  const $ = (selector) => document.querySelector(selector);
  const showMessage = (form, message, error = false) => {
    if (!form) return;
    let node = form.querySelector(".auth-message");
    if (!node) {
      node = document.createElement("p");
      node.className = "auth-message";
      form.appendChild(node);
    }
    node.textContent = message;
    node.setAttribute("role", error ? "alert" : "status");
    node.style.color = error ? "#b42318" : "#087ba5";
  };
  const requireConfig = (form) => {
    if (client) return true;
    showMessage(form, unavailableMessage(), true);
    return false;
  };
  const redirectTo = (page) => { window.location.href = page; };
  const setBusy = (button, busy) => {
    if (!button) return;
    button.disabled = busy;
    if (busy) button.dataset.previousLabel = button.textContent;
    else if (button.dataset.previousLabel) {
      button.textContent = button.dataset.previousLabel;
      delete button.dataset.previousLabel;
    }
  };

  async function getSession() {
    if (!client) return null;
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function guardPage() {
    if (!document.body.classList.contains("app-page")) return;
    await clientReady;
    if (!client) {
      const note = document.createElement("div");
      note.className = "auth-notice";
      note.textContent = unavailableMessage();
      document.body.prepend(note);
      return;
    }
    try {
      const session = await getSession();
      if (!session) {
        redirectTo("index.html");
        return;
      }
      const nav = $(".header-links");
      if (nav && !nav.querySelector("[data-logout]")) {
        const button = document.createElement("button");
        button.className = "profile-button logout-button";
        button.type = "button";
        button.dataset.logout = "true";
        button.textContent = uiText("nav.logout", "Выйти");
        button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            const { error } = await client.auth.signOut();
            if (error) throw error;
            redirectTo("index.html");
          } catch (error) {
            console.error("Не удалось завершить сеанс.", error);
            button.disabled = false;
            showMessage(nav, "Не удалось выйти. Попробуйте ещё раз.", true);
          }
        });
        nav.appendChild(button);
      }
      if ($(".profile-card")) await loadProfile(session);
    } catch (error) {
      console.error("Не удалось проверить сессию.", error);
      const note = document.createElement("div");
      note.className = "auth-notice";
      note.textContent = uiText("auth.sessionError", "Не удалось проверить вход. Обновите страницу или попробуйте позже.");
      document.body.prepend(note);
    }
  }

  async function loadProfile(session) {
    const form = $(".profile-card");
    if (!form || !client) return;
    const { data, error } = await client.from("profiles")
      .select("*").eq("id", session.user.id).maybeSingle();
    if (error) {
      showMessage(form, translateError(error.message), true);
      return;
    }
    const meta = session.user.user_metadata || {};
    const values = {
      firstName: data?.first_name ?? meta.first_name ?? "",
      lastName: data?.last_name ?? meta.last_name ?? "",
      nickname: data?.nickname ?? meta.nickname ?? "",
      email: session.user.email || "",
      birthday: data?.birthday ?? meta.birthday ?? "",
      focus: data?.focus ?? meta.focus ?? "",
      experience: data?.experience ?? meta.experience ?? "",
      projectGoal: data?.project_goal ?? meta.project_goal ?? ""
    };
    Object.entries(values).forEach(([name, value]) => {
      const input = form.elements.namedItem(name);
      if (input) input.value = value || "";
    });
    const greeting = $("#profile-greeting");
    const summary = $("#profile-summary");
    const displayName = values.nickname || values.firstName || values.email;
    if (greeting) greeting.textContent = uiText("profile.greeting", "Профиль {name}", { name: displayName });
    if (summary) {
      const focus = localizedProfileValue("focus", values.focus);
      const experience = localizedProfileValue("experience", values.experience);
      summary.textContent = focus
        ? focus + (experience ? " · " + experience : "") + ". " + uiText("profile.personalize", "Настройте профиль под свои задачи.")
        : uiText("profile.summary", "Расскажите о своём опыте и проектах — профиль станет полезнее для вас.");
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await guardPage();

    const loginForm = document.querySelector("[data-auth='login']");
    if (loginForm) loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!requireConfig(loginForm)) return;
      const email = loginForm.elements.email.value.trim();
      const password = loginForm.elements.password.value;
      const button = loginForm.querySelector("button[type=submit]");
      setBusy(button, true);
      try {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) showMessage(loginForm, translateError(error.message), true);
        else redirectTo("main.html");
      } catch (error) {
        console.error("Не удалось выполнить вход.", error);
        showMessage(loginForm, "Не удалось связаться с сервисом. Проверьте интернет и попробуйте ещё раз.", true);
      } finally {
        setBusy(button, false);
      }
    });

    const signupForm = document.querySelector("[data-auth='signup']");
    if (signupForm) signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!requireConfig(signupForm)) return;
      const email = signupForm.elements.email.value.trim();
      const password = signupForm.elements.password.value;
      const firstName = signupForm.elements.firstName.value.trim();
      const lastName = signupForm.elements.lastName.value.trim();
      const nickname = signupForm.elements.nickname.value.trim();
      const birthday = signupForm.elements.birthday.value.trim();
      const button = signupForm.querySelector("button[type=submit]");
      setBusy(button, true);
      try {
        const { data, error } = await client.auth.signUp({
          email, password,
          options: { data: { first_name: firstName, last_name: lastName, nickname, birthday } }
        });
        if (error) showMessage(signupForm, translateError(error.message), true);
        else if (data.session) redirectTo("main.html");
        else showMessage(signupForm, "Аккаунт создан. Проверьте почту и подтвердите регистрацию, затем войдите.");
      } catch (error) {
        console.error("Не удалось создать аккаунт.", error);
        showMessage(signupForm, "Не удалось связаться с сервисом. Проверьте интернет и попробуйте ещё раз.", true);
      } finally {
        setBusy(button, false);
      }
    });

    const profileForm = $(".profile-card");
    if (profileForm) profileForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!requireConfig(profileForm)) return;
      const button = profileForm.querySelector("button[type=submit]");
      setBusy(button, true);
      try {
        const session = await getSession();
        if (!session) return redirectTo("index.html");
        const payload = {
          id: session.user.id,
          first_name: profileForm.elements.firstName.value.trim(),
          last_name: profileForm.elements.lastName.value.trim(),
          nickname: profileForm.elements.nickname.value.trim(),
          birthday: profileForm.elements.birthday.value || null,
          focus: profileForm.elements.focus.value,
          experience: profileForm.elements.experience.value,
          project_goal: profileForm.elements.projectGoal.value.trim(),
          updated_at: new Date().toISOString()
        };
        const { error } = await client.from("profiles").upsert(payload);
        if (error) showMessage(profileForm, translateError(error.message), true);
        else {
          showMessage(profileForm, uiText("profile.saved", "Профиль сохранён."));
          const greeting = $("#profile-greeting");
          const summary = $("#profile-summary");
          if (greeting) greeting.textContent = uiText("profile.greeting", "Профиль {name}", {
            name: payload.nickname || payload.first_name || session.user.email
          });
          if (summary) {
            const focus = localizedProfileValue("focus", payload.focus);
            const experience = localizedProfileValue("experience", payload.experience);
            summary.textContent = focus
              ? focus + (experience ? " · " + experience : "") + ". " + uiText("profile.personalize", "Настройте профиль под свои задачи.")
              : uiText("profile.addFocus", "Добавьте направление, чтобы персонализировать своё пространство.");
          }
        }
      } catch (error) {
        console.error("Не удалось сохранить профиль.", error);
        showMessage(profileForm, uiText("profile.saveError", "Не удалось сохранить изменения. Попробуйте ещё раз."), true);
      } finally {
        setBusy(button, false);
      }
    });

    const passwordResetButton = document.querySelector("[data-password-reset]");
    if (passwordResetButton) passwordResetButton.addEventListener("click", async () => {
      const form = $(".profile-card");
      if (!requireConfig(form)) return;
      try {
        const session = await getSession();
        if (!session || !session.user.email) {
          showMessage(form, uiText("profile.emailMissing", "Не удалось получить почту аккаунта. Войдите заново."), true);
          return;
        }
        const { error } = await client.auth.resetPasswordForEmail(session.user.email, {
          redirectTo: new URL("reset-password.html", window.location.href).href
        });
        if (error) showMessage(form, translateError(error.message), true);
        else showMessage(form, uiText("profile.passwordSent", "Ссылка для смены пароля отправлена на почту аккаунта."));
      } catch (error) {
        console.error("Не удалось отправить ссылку для смены пароля.", error);
        showMessage(form, uiText("profile.passwordError", "Не удалось отправить письмо. Попробуйте ещё раз."), true);
      }
    });

    const resetForm = document.querySelector("[data-auth='reset-password']");
    if (resetForm) resetForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!requireConfig(resetForm)) return;
      const password = resetForm.elements.password.value;
      const confirmation = resetForm.elements.confirmPassword.value;
      if (password !== confirmation) {
        showMessage(resetForm, "Пароли не совпадают.", true);
        return;
      }
      const button = resetForm.querySelector("button[type=submit]");
      setBusy(button, true);
      try {
        const { error } = await client.auth.updateUser({ password });
        if (error) showMessage(resetForm, translateError(error.message), true);
        else {
          showMessage(resetForm, "Пароль изменён. Теперь можно войти с новым паролем.", false);
          const loginLink = resetForm.querySelector(".reset-login-link");
          if (loginLink) loginLink.hidden = false;
        }
      } catch (error) {
        console.error("Не удалось изменить пароль.", error);
        showMessage(resetForm, "Не удалось изменить пароль. Откройте свежую ссылку из письма.", true);
      } finally {
        setBusy(button, false);
      }
    });
    if (resetForm) {
      const readyClient = await clientReady;
      if (!readyClient) {
        showMessage(resetForm, unavailableMessage(), true);
      } else {
        try {
          if (!await getSession()) {
            showMessage(resetForm, "Ссылка для смены пароля недействительна или устарела. Запросите новую.", true);
          }
        } catch (error) {
          console.error("Не удалось проверить ссылку для смены пароля.", error);
          showMessage(resetForm, "Не удалось проверить ссылку. Запросите новую и попробуйте ещё раз.", true);
        }
      }
    }

    const forgotForm = document.querySelector("[data-auth='forgot-password']");
    if (forgotForm) forgotForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!requireConfig(forgotForm)) return;
      const email = forgotForm.elements.email.value.trim();
      const button = forgotForm.querySelector("button[type=submit]");
      setBusy(button, true);
      try {
        const { error } = await client.auth.resetPasswordForEmail(email, {
          redirectTo: new URL("reset-password.html", window.location.href).href
        });
        showMessage(forgotForm, error
          ? translateError(error.message)
          : "Если аккаунт с такой почтой существует, инструкция отправлена на почту.", !!error);
      } catch (error) {
        console.error("Не удалось отправить письмо для сброса пароля.", error);
        showMessage(forgotForm, "Не удалось связаться с сервисом. Попробуйте ещё раз.", true);
      } finally {
        setBusy(button, false);
      }
    });
  });

  function translateError(message) {
    const known = {
      "Invalid login credentials": "Неверная почта или пароль.",
      "Email not confirmed": "Сначала подтвердите почту по ссылке из письма.",
      "User already registered": "Аккаунт с такой почтой уже существует.",
      "Password should be at least 6 characters": "Пароль слишком короткий."
    };
    if (known[message]) return known[message];
    if (/profiles.*(does not exist|schema cache)|relation .*profiles.*does not exist/i.test(message)) {
      return uiText("profile.schemaError", "Таблица профиля не найдена. Выполните supabase-setup.sql в SQL Editor проекта.");
    }
    if (/column .* does not exist|could not find the .* column/i.test(message)) {
      return uiText("profile.columnsError", "Структура профиля устарела. Повторно выполните supabase-setup.sql в SQL Editor проекта.");
    }
    if (/row-level security|permission denied/i.test(message)) {
      return uiText("profile.permissionError", "Нет доступа к профилю. Проверьте RLS-политики из supabase-setup.sql.");
    }
    return message;
  }

  function uiText(key, fallback, values) {
    if (window.butleekTranslate) return window.butleekTranslate(key, values);
    return Object.keys(values || {}).reduce((text, name) => text.replace("{" + name + "}", values[name]), fallback);
  }

  function localizedProfileValue(field, value) {
    const options = {
      focus: {
        Frontend: "role.frontend",
        Backend: "role.backend",
        "Full-stack": "role.fullstack",
        "Мобильная разработка": "role.mobile",
        "Дизайн": "role.design",
        "Другое": "role.other"
      },
      experience: {
        "Начинаю": "experience.beginner",
        "Учусь и практикуюсь": "experience.learning",
        "Работаю в разработке": "experience.working",
        "Опытный специалист": "experience.advanced"
      }
    };
    const key = options[field] && options[field][value];
    return key ? uiText(key, value) : value;
  }
})();
