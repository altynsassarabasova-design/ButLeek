(function () {
    'use strict';

    const panel = document.getElementById('suggestion-inbox');
    const list = document.getElementById('suggestion-inbox-list');
    const count = document.getElementById('suggestion-inbox-count');
    const status = document.getElementById('suggestion-inbox-status');
    const refresh = document.getElementById('suggestion-inbox-refresh');

    if (!panel || !list || !count || !status || !refresh) return;

    function tr(key, fallback, values) {
        return window.butleekTranslate
            ? window.butleekTranslate(key, values)
            : fallback;
    }

    function createText(tag, className, value) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        node.textContent = value;
        return node;
    }

    function appendDetail(card, label, value) {
        const line = document.createElement('p');
        const heading = document.createElement('strong');
        heading.textContent = label + ': ';
        line.appendChild(heading);
        line.appendChild(document.createTextNode(value));
        card.appendChild(line);
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        const locale = window.butleekLanguage === 'kk' ? 'kk-KZ' :
            (window.butleekLanguage === 'en' ? 'en' : 'ru-RU');
        return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    }

    function appendWebsite(card, value) {
        const line = document.createElement('p');
        const heading = document.createElement('strong');
        heading.textContent = tr('adminSuggestions.website', 'Сайт или документация') + ': ';
        line.appendChild(heading);
        try {
            const url = new URL(value);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
                const link = document.createElement('a');
                link.href = url.href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = value;
                line.appendChild(link);
            } else {
                line.appendChild(document.createTextNode(value));
            }
        } catch (error) {
            line.appendChild(document.createTextNode(value));
        }
        card.appendChild(line);
    }

    function renderSuggestions(suggestions, client) {
        list.textContent = '';
        const pendingSuggestions = suggestions.filter(function (suggestion) {
            return suggestion.status === 'pending';
        });
        count.textContent = tr('adminSuggestions.pendingCount', 'Ожидают проверки: {count}', {
            count: String(pendingSuggestions.length)
        });

        if (!pendingSuggestions.length) {
            list.appendChild(createText('p', 'form-note', tr('adminSuggestions.empty', 'Новых предложений пока нет.')));
            return;
        }

        pendingSuggestions.forEach(function (suggestion) {
            const card = document.createElement('article');
            card.className = 'suggestion-inbox-card';
            const alreadyPublished = suggestion.status === 'pending' &&
                window.butleekIsPublishedTool &&
                window.butleekIsPublishedTool(suggestion.name);
            const publishedCatalogReady = window.butleekSharedCatalogReady === true;
            const statusLabels = {
                pending: alreadyPublished
                    ? tr('adminSuggestions.alreadyPublished', 'Уже есть в каталоге')
                    : tr('adminSuggestions.pending', 'На проверке'),
                approved: tr('adminSuggestions.approved', 'Принято'),
                rejected: tr('adminSuggestions.rejected', 'Отклонено')
            };

            const header = document.createElement('header');
            header.appendChild(createText('h4', '', suggestion.name));
            header.appendChild(createText(
                'span',
                'suggestion-inbox-status is-' + suggestion.status,
                statusLabels[suggestion.status] || suggestion.status
            ));
            card.appendChild(header);

            const date = formatDate(suggestion.created_at);
            const category = tr('adminSuggestions.category', 'Категория') + ': ' + suggestion.category;
            card.appendChild(createText('p', 'suggestion-inbox-meta', date ? category + ' · ' + date : category));
            appendWebsite(card, suggestion.website);
            appendDetail(card, tr('adminSuggestions.description', 'Описание'), suggestion.description);
            appendDetail(card, tr('adminSuggestions.reason', 'Почему стоит добавить'), suggestion.reason);

            if (suggestion.status === 'pending') {
                if (alreadyPublished) {
                    card.appendChild(createText(
                        'p',
                        'suggestion-inbox-notice',
                        tr('adminSuggestions.duplicate', 'Этот инструмент уже опубликован в каталоге.')
                    ));
                } else if (!publishedCatalogReady) {
                    card.appendChild(createText(
                        'p',
                        'suggestion-inbox-notice',
                        tr('adminSuggestions.catalogUnavailable', 'Не удалось загрузить каталог: обновите страницу после настройки Supabase.')
                    ));
                }

                const actions = document.createElement('div');
                actions.className = 'suggestion-inbox-actions';
                if (!alreadyPublished && publishedCatalogReady) {
                    const accept = createText(
                        'button',
                        'button button-primary',
                        tr('adminSuggestions.accept', 'Принять и опубликовать')
                    );
                    accept.type = 'button';
                    accept.addEventListener('click', function () {
                        reviewSuggestion(client, suggestion, 'approved', accept);
                    });
                    actions.appendChild(accept);
                }

                const reject = createText(
                    'button',
                    'button button-secondary suggestion-action-reject',
                    tr('adminSuggestions.reject', 'Отклонить')
                );
                reject.type = 'button';
                reject.addEventListener('click', function () {
                    reviewSuggestion(client, suggestion, 'rejected', reject);
                });
                actions.appendChild(reject);
                card.appendChild(actions);
            }

            list.appendChild(card);
        });
    }

    function removeReviewedSuggestion(button) {
        const card = button.closest('.suggestion-inbox-card');
        if (!card) return;

        card.remove();
        const pendingCount = list.querySelectorAll('.suggestion-inbox-card').length;
        count.textContent = tr('adminSuggestions.pendingCount', 'Ожидают проверки: {count}', {
            count: String(pendingCount)
        });

        if (!pendingCount) {
            list.appendChild(createText('p', 'form-note', tr('adminSuggestions.empty', 'Новых предложений пока нет.')));
        }
    }

    async function loadSuggestions(client) {
        refresh.disabled = true;
        status.className = 'form-message';
        status.textContent = tr('adminSuggestions.loading', 'Загружаем предложения…');

        try {
            const { data, error } = await client
                .from('tool_suggestions')
                .select('id, name, category, website, description, reason, status, created_at')
                .eq('status', 'pending')
                .order('created_at', { ascending: false })
                .limit(100);
            if (error) throw error;
            renderSuggestions(data || [], client);
            if (window.butleekSharedCatalogReady === true) {
                status.textContent = '';
                status.className = 'form-message';
            } else {
                status.textContent = tr('adminSuggestions.catalogUnavailable', 'Не удалось загрузить каталог: обновите страницу после настройки Supabase.');
                status.className = 'form-message is-error';
            }
            return true;
        } catch (error) {
            console.error('Не удалось загрузить предложения инструментов для администратора.', error);
            status.className = 'form-message is-error';
            status.textContent = tr('adminSuggestions.loadError', 'Не удалось загрузить предложения. Попробуйте обновить список.');
            return false;
        } finally {
            refresh.disabled = false;
        }
    }

    async function reviewSuggestion(client, suggestion, decision, button) {
        const actions = button.parentElement;
        const buttons = actions.querySelectorAll('button');
        Array.prototype.forEach.call(buttons, function (action) {
            action.disabled = true;
        });
        status.className = 'form-message';
        status.textContent = tr('adminSuggestions.saving', 'Сохраняем решение…');

        try {
            const { data, error } = await client.rpc('review_tool_suggestion', {
                suggestion_id: suggestion.id,
                decision: decision
            });
            if (error) throw error;
            if (decision === 'approved' && !data) {
                throw new Error('The approved tool was not returned by the database.');
            }

            removeReviewedSuggestion(button);

            let catalogReloaded = true;
            if (decision === 'approved' && window.butleekReloadApprovedTools) {
                catalogReloaded = await window.butleekReloadApprovedTools();
            }
            const inboxReloaded = await loadSuggestions(client);

            if (!inboxReloaded) return;
            if (decision === 'approved') {
                status.textContent = catalogReloaded
                    ? tr('adminSuggestions.accepted', 'Предложение принято, инструмент опубликован в каталоге.')
                    : tr('adminSuggestions.acceptedCatalogRefreshFailed', 'Предложение принято, но каталог не обновился. Перезагрузите страницу.');
            } else {
                status.textContent = tr('adminSuggestions.rejectedMessage', 'Предложение отклонено.');
            }
            status.className = 'form-message is-ok';
        } catch (error) {
            console.error('Не удалось обработать предложение инструмента.', error);
            status.className = 'form-message is-error';
            status.textContent = error.code === '23505'
                ? tr('adminSuggestions.duplicate', 'Этот инструмент уже опубликован в каталоге.')
                : tr('adminSuggestions.updateError', 'Не удалось сохранить решение. Обновите SQL Supabase и попробуйте ещё раз.') +
                    (error.message ? ' ' + error.message : '');
            Array.prototype.forEach.call(buttons, function (action) {
                action.disabled = false;
            });
        }
    }

    async function initialize() {
        let isAdmin = false;
        try {
            const client = window.butleekSupabase || await window.butleekSupabaseReady;
            if (!client) return;

            const { data: sessionData, error: sessionError } = await client.auth.getSession();
            if (sessionError) throw sessionError;
            if (!sessionData.session) return;

            const { data, error } = await client.rpc('is_community_admin');
            if (error) throw error;
            isAdmin = data === true;
            if (!isAdmin) return;

            if (window.butleekApprovedToolsReady) {
                await window.butleekApprovedToolsReady;
            }
            panel.hidden = false;
            refresh.addEventListener('click', function () {
                loadSuggestions(client);
            });
            await loadSuggestions(client);
        } catch (error) {
            console.error('Не удалось проверить доступ к предложениям инструментов.', error);
            if (isAdmin) {
                panel.hidden = false;
                status.className = 'form-message is-error';
                status.textContent = tr('adminSuggestions.loadError', 'Не удалось загрузить предложения. Попробуйте обновить список.');
            }
        }
    }

    initialize();
})();
