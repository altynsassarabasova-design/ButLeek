(function () {
    'use strict';

    const STORE = 'butleek:v1';
    const DEFAULT_TOOLS = [
        { id: 'react', name: 'React', category: 'Интерфейс', lang: 'JavaScript / TypeScript', start: true,
          role: 'Библиотека для пользовательских интерфейсов.',
          requirements: 'JavaScript или TypeScript и Node.js для сборки; маршрутизацию и работу с данными выбирают отдельно.',
          desc: 'Интерфейсы из компонентов. Гибкая основа для веб-приложений.', cols: ['first'],
          use: 'Интерактивные сайты и интерфейсы приложений.',
          level: 'Компоненты, JSX, props, состояние и хуки.', price: 'Бесплатно, MIT',
          good: 'Большие интерфейсы с переиспользуемыми компонентами.', tradeoff: 'Нужно отдельно выбрать маршрутизацию и работу с данными.' },
        { id: 'fastapi', name: 'FastAPI', category: 'Backend', lang: 'Python', start: true,
          role: 'Веб-фреймворк для API на Python.',
          requirements: 'Python 3 и ASGI-сервер для запуска; база данных подключается отдельно.',
          desc: 'Типизированные API на Python с автоматической документацией.', cols: ['first'],
          use: 'API и серверная часть на Python.',
          level: 'Типы Python, HTTP-маршруты, схемы данных и основы ASGI.', price: 'Бесплатно, MIT',
          good: 'API с типизацией и автоматической документацией.', tradeoff: 'Нужно отдельно выбрать базу и способ запуска в production.' },
        { id: 'vite', name: 'Vite', category: 'Сборка', lang: 'JavaScript / TypeScript', start: true,
          role: 'Сервер разработки и сборщик фронтенд-проектов.',
          requirements: 'Node.js и пакетный менеджер; сам по себе не предоставляет UI-фреймворк или backend.',
          desc: 'Быстрый запуск проекта и удобная среда разработки.', cols: ['first', 'workflow'],
          use: 'Разработка и сборка фронтенд-проектов.',
          level: 'Зависимости проекта, npm-скрипты и настройки сборки.', price: 'Бесплатно, MIT',
          good: 'Быстрый старт SPA и небольших сайтов.', tradeoff: 'Сам по себе не задаёт структуру приложения или backend.' },
        { id: 'typescript', name: 'TypeScript', category: 'Язык', lang: 'TypeScript', start: true,
          role: 'Язык с проверкой типов, компилируемый в JavaScript.',
          requirements: 'Компилятор TypeScript и настройки проекта; браузер выполняет скомпилированный JavaScript.',
          desc: 'Статическая типизация, которая помогает находить ошибки раньше.', cols: ['first'],
          use: 'Проверка типов в JavaScript-приложениях.',
          level: 'Типы, интерфейсы, сужение типов и конфигурация компилятора.', price: 'Бесплатно, Apache-2.0',
          good: 'Командная разработка и код с большим числом изменений.', tradeoff: 'Понадобится время на типы и настройку сборки.' },
        { id: 'postgresql', name: 'PostgreSQL', category: 'База данных', lang: 'SQL', start: true,
          role: 'Реляционная система управления базами данных.',
          requirements: 'Сервер PostgreSQL локально или в облаке; приложению понадобится драйвер либо ORM.',
          desc: 'Надёжная реляционная база для проектов любого размера.', cols: ['first'],
          use: 'Хранение связанных и структурированных данных.',
          level: 'SQL, связи таблиц, ограничения, индексы и транзакции.', price: 'Бесплатно, open source',
          good: 'Приложениям с отношениями, транзакциями и SQL-запросами.', tradeoff: 'Нужно спланировать схему и миграции.' },
        { id: 'docker', name: 'Docker', category: 'Инфраструктура', lang: 'YAML / Dockerfile', start: true,
          role: 'Инструменты для сборки и запуска контейнеров.',
          requirements: 'Docker Engine или совместимая среда контейнеров; Dockerfile описывает образ приложения.',
          desc: 'Одинаковое окружение для разработки, тестов и запуска.', cols: ['first', 'workflow'],
          use: 'Упаковка приложений и зависимостей в контейнеры.',
          level: 'Образы, контейнеры, Dockerfile, тома и сети.', price: 'Бесплатно для личных проектов; условия зависят от использования',
          good: 'Повторяемые окружения для команды и CI.', tradeoff: 'Добавляет новые понятия: образы, сети, тома и слои.' },
        { id: 'eslint', name: 'ESLint', category: 'Качество', lang: 'JavaScript / TypeScript', start: true,
          role: 'Статический анализатор и линтер JavaScript/TypeScript.',
          requirements: 'Node.js, конфигурация проекта и плагины для выбранных языков и фреймворков.',
          desc: 'Находит ошибки и держит единый стиль кода во всей команде.', cols: ['workflow'],
          use: 'Автоматическая проверка JavaScript и TypeScript.',
          level: 'Конфигурация правил, плагины и запуск проверок в редакторе или CI.', price: 'Бесплатно, MIT',
          good: 'Проверка проекта и единые правила команды.', tradeoff: 'Нужно выбрать подходящую конфигурацию правил.' },
        { id: 'git', name: 'Git', category: 'Рабочий процесс', lang: 'CLI', start: true,
          role: 'Распределённая система контроля версий.',
          requirements: 'Git устанавливается локально; GitHub или другой удалённый сервис нужен для обмена кодом.',
          desc: 'История изменений и командная работа над одним кодом.', cols: ['workflow'],
          use: 'История проекта, ветки и совместная работа.',
          level: 'Коммиты, ветки, слияние изменений и разрешение конфликтов.', price: 'Бесплатно, open source',
          good: 'Любому проекту с историей изменений или несколькими участниками.', tradeoff: 'Конфликты веток требуют базового понимания merge и rebase.' }
    ];
    const TOOL_TRANSLATIONS = {
        en: {
            react: {
                desc: 'Component-based interfaces for flexible web apps.',
                role: 'Library for building user interfaces.',
                requirements: 'JavaScript or TypeScript and Node.js for the build; choose routing and data tools separately.',
                use: 'Interactive websites and application interfaces.',
                level: 'Components, JSX, props, state, and hooks.', price: 'Free, MIT',
                good: 'Large interfaces with reusable components.',
                tradeoff: 'Choose routing and data management separately.'
            },
            fastapi: {
                desc: 'Build typed Python APIs with automatic documentation.',
                role: 'Python web framework for APIs.',
                requirements: 'Python 3 and an ASGI server; choose a database separately.',
                use: 'Python APIs and backend services.',
                level: 'Python types, HTTP routes, data schemas, and ASGI basics.', price: 'Free, MIT',
                good: 'Typed APIs with generated documentation.',
                tradeoff: 'Choose a database and production deployment separately.'
            },
            vite: {
                desc: 'Start projects quickly and streamline front-end development.',
                role: 'Front-end development server and bundler.',
                requirements: 'Node.js and a package manager; Vite does not provide a UI framework or backend.',
                use: 'Developing and bundling front-end projects.',
                level: 'Project dependencies, npm scripts, and build settings.', price: 'Free, MIT',
                good: 'Quick starts for SPAs and small sites.',
                tradeoff: 'Does not define your app or backend architecture.'
            },
            typescript: {
                desc: 'Static types help catch JavaScript errors earlier.',
                role: 'Typed language that compiles to JavaScript.',
                requirements: 'TypeScript compiler and project configuration; browsers run the emitted JavaScript.',
                use: 'Type-checking JavaScript applications.',
                level: 'Types, interfaces, narrowing, and compiler configuration.', price: 'Free, Apache-2.0',
                good: 'Team projects with frequent code changes.',
                tradeoff: 'Requires time for types and build configuration.'
            },
            postgresql: {
                desc: 'A reliable relational database for projects of any size.',
                role: 'Relational database management system.',
                requirements: 'A local or hosted PostgreSQL server; apps connect through a driver or ORM.',
                use: 'Storing related, structured data.',
                level: 'SQL, table relationships, constraints, indexes, and transactions.', price: 'Free, open source',
                good: 'Apps that need relations, transactions, and SQL.',
                tradeoff: 'Requires planning schemas and migrations.'
            },
            docker: {
                desc: 'Keep development, test, and production environments consistent.',
                role: 'Tools for building and running containers.',
                requirements: 'Docker Engine or a compatible container runtime; a Dockerfile defines the image.',
                use: 'Packaging apps and dependencies in containers.',
                level: 'Images, containers, Dockerfiles, volumes, and networks.', price: 'Free for personal projects; terms depend on use',
                good: 'Reproducible team and CI environments.',
                tradeoff: 'Introduces images, networks, volumes, and layers.'
            },
            eslint: {
                desc: 'Find errors and keep code style consistent across the team.',
                role: 'Static analyzer and linter for JavaScript/TypeScript.',
                requirements: 'Node.js, project configuration, and plugins for the chosen languages or frameworks.',
                use: 'Automated JavaScript and TypeScript checks.',
                level: 'Rules, plugins, and running checks in an editor or CI.', price: 'Free, MIT',
                good: 'Project checks and shared team rules.',
                tradeoff: 'Requires choosing a suitable ruleset.'
            },
            git: {
                desc: 'Track changes and collaborate on the same codebase.',
                role: 'Distributed version control system.',
                requirements: 'Git installed locally; GitHub or another remote service is optional for sharing code.',
                use: 'Project history, branches, and collaboration.',
                level: 'Commits, branches, merging, and resolving conflicts.', price: 'Free, open source',
                good: 'Any project with history or multiple contributors.',
                tradeoff: 'Branch conflicts require understanding merge and rebase.'
            }
        },
        kk: {
            react: {
                desc: 'Икемді веб-қолданбаларға арналған компоненттік интерфейстер.',
                role: 'Пайдаланушы интерфейстерін жасауға арналған кітапхана.',
                requirements: 'Жинақтау үшін JavaScript немесе TypeScript және Node.js; маршрутизация мен деректер құралдары бөлек таңдалады.',
                use: 'Интерактивті сайттар мен қолданба интерфейстері.',
                level: 'Компоненттер, JSX, props, күй және хуктар.', price: 'Тегін, MIT',
                good: 'Қайта қолданылатын компоненттері бар күрделі интерфейстер.',
                tradeoff: 'Маршрутизация мен деректерді басқаруды бөлек таңдаңыз.'
            },
            fastapi: {
                desc: 'Автоматты құжаттамасы бар типтелген Python API жасаңыз.',
                role: 'Python тіліндегі API жасауға арналған веб-фреймворк.',
                requirements: 'Python 3 және ASGI сервері; дерекқор бөлек таңдалады.',
                use: 'Python тіліндегі API және серверлік қызметтер.',
                level: 'Python типтері, HTTP маршруттары, дерек схемалары және ASGI негіздері.', price: 'Тегін, MIT',
                good: 'Типтері мен автоматты құжаттамасы бар API.',
                tradeoff: 'Дерекқор мен production ортасын бөлек таңдаңыз.'
            },
            vite: {
                desc: 'Жобаны жылдам іске қосып, фронтенд әзірлеуді жеңілдетіңіз.',
                role: 'Фронтенд әзірлеу сервері және жинақтағыш.',
                requirements: 'Node.js және пакет менеджері; Vite интерфейс фреймворкін немесе backend-ті қамтымайды.',
                use: 'Фронтенд жобаларын әзірлеу және жинау.',
                level: 'Жоба тәуелділіктері, npm скрипттері және жинақтау баптаулары.', price: 'Тегін, MIT',
                good: 'SPA мен шағын сайттарды жылдам бастау.',
                tradeoff: 'Қолданба немесе сервер архитектурасын өзі анықтамайды.'
            },
            typescript: {
                desc: 'Статикалық типтер JavaScript қателерін ертерек табуға көмектеседі.',
                role: 'JavaScript-ке жинақталатын типтелген тіл.',
                requirements: 'TypeScript компиляторы мен жоба баптаулары; браузер жинақталған JavaScript-ті орындайды.',
                use: 'JavaScript қолданбаларындағы типтерді тексеру.',
                level: 'Типтер, интерфейстер, типтерді нақтылау және компилятор баптаулары.', price: 'Тегін, Apache-2.0',
                good: 'Коды жиі өзгеретін командалық жобалар.',
                tradeoff: 'Типтер мен жинақтау баптауларына уақыт қажет.'
            },
            postgresql: {
                desc: 'Кез келген көлемдегі жобаға арналған сенімді реляциялық дерекқор.',
                role: 'Реляциялық дерекқорды басқару жүйесі.',
                requirements: 'Жергілікті не бұлттағы PostgreSQL сервері; қолданба драйвер немесе ORM арқылы қосылады.',
                use: 'Байланысты және құрылымды деректерді сақтау.',
                level: 'SQL, кесте байланыстары, шектеулер, индекстер және транзакциялар.', price: 'Тегін, ашық кодты',
                good: 'Байланыстар, транзакциялар және SQL қажет қолданбалар.',
                tradeoff: 'Схема мен миграцияларды алдын ала жоспарлау керек.'
            },
            docker: {
                desc: 'Әзірлеу, тестілеу және өндірістік ортаны бірізді ұстаңыз.',
                role: 'Контейнерлерді құрастыру және іске қосу құралдары.',
                requirements: 'Docker Engine немесе үйлесімді контейнер ортасы; Dockerfile образды сипаттайды.',
                use: 'Қолданба мен тәуелділіктерді контейнерге жинау.',
                level: 'Образдар, контейнерлер, Dockerfile, томдар және желілер.', price: 'Жеке жобаларға тегін; шарттар қолдануға байланысты',
                good: 'Команда мен CI үшін қайталанатын орта.',
                tradeoff: 'Образдар, желілер, томдар және қабаттар ұғымдарын үйрену қажет.'
            },
            eslint: {
                desc: 'Қателерді тауып, командадағы код стилін бірізді сақтайды.',
                role: 'JavaScript/TypeScript статикалық талдағышы және линтері.',
                requirements: 'Node.js, жоба баптаулары және таңдалған тіл не фреймворкке арналған плагиндер.',
                use: 'JavaScript пен TypeScript кодын автоматты тексеру.',
                level: 'Ережелер, плагиндер және редакторда не CI ішінде тексеру.', price: 'Тегін, MIT',
                good: 'Жобаны тексеру және ортақ команда ережелері.',
                tradeoff: 'Жобаға сай ережелер жиынын таңдау керек.'
            },
            git: {
                desc: 'Өзгерістер тарихын жүргізіп, кодпен бірлесіп жұмыс істеңіз.',
                role: 'Таратылған нұсқаларды басқару жүйесі.',
                requirements: 'Git компьютерге орнатылады; кодты бөлісу үшін GitHub не басқа қашықтағы сервис қолданылады.',
                use: 'Жоба тарихы, тармақтар және бірлескен жұмыс.',
                level: 'Коммиттер, тармақтар, біріктіру және қақтығыстарды шешу.', price: 'Тегін, ашық кодты',
                good: 'Өзгерістер тарихы не бірнеше қатысушысы бар кез келген жоба.',
                tradeoff: 'Тармақ қақтығыстарын шешу үшін merge және rebase негіздерін білу керек.'
            }
        }
    };
    const COLLECTIONS = {
        first: 'Первый веб-проект',
        workflow: 'Рабочий процесс'
    };

    let storageError = '';
    let catalogLoadError = '';
    let approvedTools = [];
    let approvedToolsReady = Promise.resolve(false);
    const state = load();
    function load() {
        let s = {};
        try {
            s = JSON.parse(localStorage.getItem(STORE)) || {};
        } catch (error) {
            console.error('Не удалось прочитать сохранённые данные.', error);
            storageError = tr('storage.readError', 'Не удалось прочитать сохранённые данные. Показаны значения по умолчанию.');
        }
        const custom = Array.isArray(s.custom) ? s.custom : [];
        const removedNames = new Set(['капп', 'ъхзорпа']);
        const filteredCustom = custom.filter(function (tool) {
            return !tool || typeof tool.name !== 'string' ||
                !removedNames.has(tool.name.trim().toLocaleLowerCase('ru'));
        });
        if (filteredCustom.length !== custom.length) {
            try {
                localStorage.setItem(STORE, JSON.stringify({
                    favorites: Array.isArray(s.favorites) ? s.favorites : ['react', 'postgresql'],
                    compare: Array.isArray(s.compare) ? s.compare.slice(0, 4) : ['react', 'fastapi', 'vite'],
                    custom: filteredCustom
                }));
            } catch (error) {
                console.error('Не удалось удалить сохранённые пользовательские инструменты.', error);
                storageError = tr('storage.saveError', 'Не удалось сохранить изменения. Проверьте доступ браузера к хранилищу.');
            }
        }
        return {
            favorites: Array.isArray(s.favorites) ? s.favorites : ['react', 'postgresql'],
            compare: Array.isArray(s.compare) ? s.compare.slice(0, 4) : ['react', 'fastapi', 'vite'],
            custom: filteredCustom
        };
    }
    function save() {
        try {
            localStorage.setItem(STORE, JSON.stringify(state));
            storageError = '';
            return true;
        } catch (e) {
            console.error('Не удалось сохранить данные But|Leek.', e);
            storageError = tr('storage.saveError', 'Не удалось сохранить изменения. Проверьте доступ браузера к хранилищу.');
            return false;
        }
    }
    const view = { query: '', category: 'Все', collection: null };

    function allTools() { return DEFAULT_TOOLS.concat(approvedTools, state.custom); }
    function byId(id) {
        const list = allTools();
        for (let i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
        return null;
    }
    function tr(key, fallback, values) {
        return window.butleekTranslate ? window.butleekTranslate(key, values) : fallback;
    }
    function categoryName(category) {
        return window.butleekCategoryName ? window.butleekCategoryName(category) : category;
    }
    function toolValue(tool, field) {
        const languageCopy = TOOL_TRANSLATIONS[window.butleekLanguage || 'ru'];
        return languageCopy && languageCopy[tool.id] && languageCopy[tool.id][field] || tool[field] || '';
    }
    function collectionName(key) {
        return tr('collection.' + key, COLLECTIONS[key] || key);
    }
    function toggle(arr, id) {
        const i = arr.indexOf(id);
        if (i === -1) arr.push(id); else arr.splice(i, 1);
    }

    function iconText(tool) {
        const known = {
            react: 'R', fastapi: 'API', vite: 'V', typescript: 'TS',
            postgresql: 'PG', docker: 'D', eslint: 'E', git: 'Git'
        };
        return known[tool.id] || tool.name.slice(0, 2).toUpperCase();
    }

    function bookmarkIcon(active) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M7 4.75h10a1.5 1.5 0 0 1 1.5 1.5V20L12 16l-6.5 4V6.25A1.5 1.5 0 0 1 7 4.75Z');
        path.setAttribute('fill', active ? 'currentColor' : 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '1.7');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
        return svg;
    }

    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        if (attrs) Object.keys(attrs).forEach(function (k) {
            if (k === 'class') node.className = attrs[k];
            else if (k === 'text') node.textContent = attrs[k];
            else node.setAttribute(k, attrs[k]);
        });
        (children || []).forEach(function (c) { if (c) node.appendChild(c); });
        return node;
    }
    function $(id) { return document.getElementById(id); }

    const headerSearch = document.querySelector('.search-box input');
    const onFeed = !!$('tool-list');
    if (!onFeed) return;

    const listEl = $('tool-list');
    const filtersEl = $('catalog-filters');
    const statusEl = $('catalog-status');

    function matches(t) {
        if (view.collection && (!Array.isArray(t.cols) || t.cols.indexOf(view.collection) === -1)) return false;
        if (view.category !== 'Все' && t.category !== view.category) return false;
        if (view.query) {
            const hay = (t.name + ' ' + categoryName(t.category) + ' ' + toolValue(t, 'desc') + ' ' +
                toolValue(t, 'lang') + ' ' + t.desc).toLowerCase();
            if (hay.indexOf(view.query.toLowerCase()) === -1) return false;
        }
        return true;
    }

    function renderFilters() {
        const cats = ['Все'];
        allTools().forEach(function (t) { if (cats.indexOf(t.category) === -1) cats.push(t.category); });
        if (cats.indexOf(view.category) === -1) view.category = 'Все';
        filtersEl.textContent = '';
        cats.forEach(function (c) {
            const b = el('button', { type: 'button', class: 'chip' + (c === view.category ? ' is-active' : ''),
                'aria-pressed': String(c === view.category), text: c === 'Все' ? tr('catalog.all', c) : categoryName(c) });
            b.addEventListener('click', function () { view.category = c; renderCatalog(); renderFilters(); });
            filtersEl.appendChild(b);
        });
        if (view.collection) {
            const reset = el('button', { type: 'button', class: 'chip chip-reset',
                text: tr('catalog.resetCollection', 'Подборка: {name} ✕', { name: collectionName(view.collection) }) });
            reset.addEventListener('click', function () { view.collection = null; renderAll(); });
            filtersEl.appendChild(reset);
        }
    }

    function renderCatalog() {
        const shown = allTools().filter(matches);
        listEl.textContent = '';
        shown.forEach(function (t) {
            const isFav = state.favorites.indexOf(t.id) !== -1;
            const inCmp = state.compare.indexOf(t.id) !== -1;
            const fav = el('button', { type: 'button', class: 'icon-btn' + (isFav ? ' is-on' : ''),
                'aria-pressed': String(isFav),
                'aria-label': tr(isFav ? 'catalog.favoriteRemove' : 'catalog.favoriteAdd',
                    (isFav ? 'Убрать из избранного: {name}' : 'В избранное: {name}'), { name: t.name }),
                title: tr(isFav ? 'catalog.favoriteTitleRemove' : 'catalog.favoriteTitleAdd',
                    isFav ? 'Убрать из избранного' : 'Сохранить в избранное') });
            fav.appendChild(bookmarkIcon(isFav));
            fav.addEventListener('click', function () { toggle(state.favorites, t.id); save(); renderAll(); });
            const cmp = el('button', { type: 'button', class: 'text-btn' + (inCmp ? ' is-on' : ''),
                'aria-pressed': String(inCmp),
                text: inCmp ? tr('catalog.comparing', 'В сравнении') : tr('catalog.compareAdd', 'Сравнить') });
            cmp.addEventListener('click', function () {
                if (inCmp) toggle(state.compare, t.id);
                else if (state.compare.length >= 4) {
                    $('compare-message').textContent = tr('compare.limit', 'Для удобства сравнения выберите не больше четырёх инструментов.');
                    $('compare-message').className = 'form-message is-error';
                    return;
                } else state.compare.push(t.id);
                save();
                $('compare-message').textContent = '';
                renderAll();
            });
            const cat = el('span', { class: 'tool-category', text: categoryName(t.category) });
            const head = el('div', { class: 'tool-card-head' }, [cat, fav]);
            const title = el('a', { class: 'tool-title-link', href: 'tool.html?id=' + encodeURIComponent(t.id) },
                [el('span', { class: 'tool-icon tool-icon-' + t.id, 'aria-hidden': 'true', text: iconText(t) }),
                    el('span', { text: t.name })]);
            const card = el('article', { class: 'tool-card', id: 'tool-' + t.id }, [
                head,
                el('h3', null, [title]),
                el('p', { text: toolValue(t, 'desc') }),
                el('div', { class: 'tool-card-actions' }, [
                    cmp,
                    el('a', { class: 'text-btn', href: 'tool.html?id=' + encodeURIComponent(t.id), text: tr('catalog.details', 'Подробнее') })
                ])
            ]);
            listEl.appendChild(card);
        });
        const total = allTools().length;
        statusEl.textContent = storageError || catalogLoadError || (shown.length === 0
            ? tr('catalog.noResults', 'Ничего не найдено. Измените запрос или сбросьте фильтры.')
            : tr('catalog.shown', 'Показано {shown} из {total}', { shown: shown.length, total: total }));
        statusEl.className = 'section-meta' + (shown.length === 0 || storageError || catalogLoadError ? ' is-empty' : '');
    }

    function renderFavorites() {
        const box = $('favorite-list');
        box.textContent = '';
        const items = state.favorites.map(byId).filter(Boolean);
        if (!items.length) {
            box.appendChild(el('p', { class: 'empty-note', text: tr('favorites.empty', 'Пока пусто. Нажмите значок закладки на карточке, чтобы сохранить инструмент.') }));
            return;
        }
        items.forEach(function (t) {
            const remove = el('button', { type: 'button', class: 'text-btn', text: tr('favorites.remove', 'Убрать') });
            remove.addEventListener('click', function () { toggle(state.favorites, t.id); save(); renderAll(); });
            const open = el('a', { href: 'tool.html?id=' + encodeURIComponent(t.id), text: tr('favorites.open', 'Открыть') });
            open.addEventListener('click', function () {
                view.query = ''; view.category = 'Все'; view.collection = null;
                if (headerSearch) headerSearch.value = '';
            });
            box.appendChild(el('article', { class: 'favorite-row' }, [
                el('div', null, [el('h3', { text: t.name }), el('p', { text: categoryName(t.category) + ' · ' + toolValue(t, 'lang') })]),
                el('div', { class: 'row-actions' }, [open, remove])
            ]));
        });
    }

    function renderCompare() {
        const body = $('compare-body');
        const head = $('compare-head');
        const empty = $('compare-empty');
        const table = $('compare-table-wrap');
        const picker = $('compare-picker');
        body.textContent = '';
        head.textContent = '';
        const items = state.compare.map(byId).filter(Boolean);
        empty.hidden = items.length > 0;
        table.hidden = items.length === 0;
        $('compare-count').textContent = tr('compare.selected', 'Выбрано {count} из 4', { count: items.length });
        const candidates = allTools().filter(function (tool) { return state.compare.indexOf(tool.id) === -1; });
        picker.textContent = '';
        candidates.forEach(function (tool) {
            picker.appendChild(el('option', { value: tool.id, text: tool.name + ' · ' + categoryName(tool.category) }));
        });
        $('compare-add').disabled = items.length >= 4 || candidates.length === 0;
        $('compare-clear').disabled = items.length === 0;
        if (!items.length) return;

        head.appendChild(el('th', { scope: 'col', text: tr('compare.criteria', 'Критерий') }));
        items.forEach(function (t) {
            const link = el('a', { href: 'tool.html?id=' + encodeURIComponent(t.id), text: t.name });
            const remove = el('button', { type: 'button', class: 'text-btn',
                'aria-label': tr('compare.removeNamed', 'Убрать из сравнения: {name}', { name: t.name }),
                text: tr('compare.remove', 'Убрать') });
            remove.addEventListener('click', function () {
                toggle(state.compare, t.id);
                save();
                renderAll();
            });
            head.appendChild(el('th', { scope: 'col' }, [
                el('span', { class: 'compare-tool-category', text: categoryName(t.category) }),
                link,
                document.createElement('br'),
                remove
            ]));
        });
        [
            ['compare.role', 'Роль в стеке', 'role'],
            ['compare.task', 'Что решает', 'use'],
            ['compare.requirements', 'Что понадобится', 'requirements'],
            ['compare.environment', 'Язык / среда', 'lang'],
            ['compare.level', 'Что нужно освоить', 'level'],
            ['compare.cost', 'Лицензия и стоимость', 'price'],
            ['compare.good', 'Хороший выбор, если…', 'good'],
            ['compare.consider', 'Ограничения', 'tradeoff']
        ].forEach(function (row) {
            const cells = [el('th', { scope: 'row', text: tr(row[0], row[1]) })];
            items.forEach(function (tool) {
                const field = row[2];
                const fallback = {
                    role: tr('compare.roleFallback', 'Сверьтесь с описанием инструмента и документацией'),
                    use: toolValue(tool, 'desc') || 'Не указано',
                    requirements: tr('compare.requirementsFallback', 'Зависят от выбранного стека и способа запуска'),
                    level: tr('compare.levelFallback', 'Сложность зависит от вашего опыта и проекта'),
                    price: tr('compare.priceFallback', 'Проверьте условия и лицензию на официальном сайте'),
                    good: toolValue(tool, 'desc') || 'Не указано',
                    tradeoff: tr('compare.considerFallback', 'Перед выбором проверьте документацию и совместимость.')
                };
                cells.push(el('td', { text: toolValue(tool, field) || fallback[field] || toolValue(tool, 'lang') || 'Не указано' }));
            });
            body.appendChild(el('tr', null, cells));
        });
    }

    function renderCollections() {
        Object.keys(COLLECTIONS).forEach(function (key) {
            const n = allTools().filter(function (t) { return Array.isArray(t.cols) && t.cols.indexOf(key) !== -1; }).length;
            const count = document.querySelector('[data-collection="' + key + '"] .tool-category');
            const language = window.butleekLanguage || 'ru';
            const unit = language === 'en' ? (n === 1 ? 'tool' : 'tools') :
                (language === 'kk' ? 'құрал' : plural(n, 'инструмент', 'инструмента', 'инструментов'));
            if (count) count.textContent = n + ' ' + unit;
        });
        const cards = document.querySelectorAll('[data-collection]');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.toggle('is-active', cards[i].getAttribute('data-collection') === view.collection);
        }
    }
    function plural(n, a, b, c) {
        const m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return a;
        if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return b;
        return c;
    }

    function renderAll() {
        renderFilters(); renderCatalog(); renderFavorites(); renderCompare(); renderCollections();
    }

    async function loadApprovedTools() {
        try {
            const client = window.butleekSupabase || await window.butleekSupabaseReady;
            if (!client) throw new Error('Supabase is unavailable.');

            const { data, error } = await client
                .from('approved_tools')
                .select('id, name, category, website, description')
                .order('created_at', { ascending: false });
            if (error) throw error;

            approvedTools = (data || []).map(function (tool) {
                return {
                    id: tool.id,
                    name: tool.name,
                    category: tool.category,
                    icon: tool.name.slice(0, 2).toUpperCase(),
                    lang: tr('tool.approvedEnvironment', 'Зависит от инструмента'),
                    desc: tool.description,
                    docs: tool.website,
                    cols: []
                };
            });
            catalogLoadError = '';
            window.butleekSharedCatalogReady = true;
            renderAll();
            return true;
        } catch (error) {
            console.error('Не удалось загрузить принятые инструменты.', error);
            catalogLoadError = tr('catalog.approvedLoadError', 'Не удалось загрузить принятые инструменты. Выполните обновлённый supabase-setup.sql.');
            window.butleekSharedCatalogReady = false;
            renderAll();
            return false;
        }
    }

    window.butleekIsPublishedTool = function (name) {
        const normalized = String(name || '').trim().toLocaleLowerCase();
        return DEFAULT_TOOLS.concat(approvedTools).some(function (tool) {
            return tool.name.trim().toLocaleLowerCase() === normalized;
        });
    };
    window.butleekReloadApprovedTools = loadApprovedTools;

    function openCollection(key) {
        view.collection = key; view.category = 'Все'; view.query = '';
        if (headerSearch) headerSearch.value = '';
        renderAll();
        scrollToCatalog();
    }

    function scrollToCatalog() {
        const reducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        $('catalog').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }

    if (headerSearch) {
        headerSearch.addEventListener('input', function () { view.query = headerSearch.value.trim(); renderCatalog(); });
        headerSearch.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); scrollToCatalog(); }
        });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-collection]'), function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); openCollection(a.getAttribute('data-collection')); });
    });
    const firstBtn = $('open-first-collection');
    if (firstBtn) firstBtn.addEventListener('click', function (e) { e.preventDefault(); openCollection('first'); });

    const form = document.querySelector('.add-tool-form');
    const formMsg = $('add-tool-message');
    if (form) form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = form.elements.toolName.value.trim();
        const desc = form.elements.description.value.trim();
        const website = form.elements.website.value.trim();
        const reason = form.elements.reason.value.trim();
        if (!name || !desc || !website || !reason) return;
        try {
            const protocol = new URL(website).protocol;
            if (protocol !== 'http:' && protocol !== 'https:') throw new Error('Unsupported website protocol.');
        } catch (error) {
            formMsg.textContent = tr('suggest.websiteInvalid', 'Укажите сайт с адресом, начинающимся на http:// или https://.');
            formMsg.className = 'form-message is-error';
            return;
        }
        if (!await approvedToolsReady) {
            formMsg.textContent = tr('suggest.catalogCheckFailed', 'Не удалось проверить общий каталог. Обновите страницу перед отправкой.');
            formMsg.className = 'form-message is-error';
            return;
        }
        const dup = allTools().some(function (t) {
            return t.name.trim().toLocaleLowerCase() === name.toLocaleLowerCase();
        });
        if (dup) {
            formMsg.textContent = tr('suggest.duplicate', 'Инструмент «{name}» уже есть в каталоге.', { name: name });
            formMsg.className = 'form-message is-info';
            return;
        }
        const client = window.butleekSupabase || (window.butleekSupabaseReady
            ? await window.butleekSupabaseReady
            : null);
        if (!client) {
            formMsg.textContent = tr('suggest.unavailable', 'Сервис предложений недоступен. Проверьте подключение к Supabase и обновите страницу.');
            formMsg.className = 'form-message is-error';
            return;
        }
        const submit = form.querySelector('button[type="submit"]');
        submit.disabled = true;
        try {
            const sessionResult = await client.auth.getSession();
            if (sessionResult.error) throw sessionResult.error;
            if (!sessionResult.data.session) {
                formMsg.textContent = tr('suggest.login', 'Войдите в аккаунт, чтобы отправить предложение на проверку.');
                formMsg.className = 'form-message is-error';
                return;
            }
            const result = await client.from('tool_suggestions').insert({
                user_id: sessionResult.data.session.user.id,
                name: name,
                category: form.elements.category.value,
                website: website,
                description: desc,
                reason: reason
            });
            if (result.error) throw result.error;
            form.reset();
            formMsg.textContent = tr('suggest.sent', 'Предложение отправлено команде на проверку. В каталог оно попадёт только после одобрения.');
            formMsg.className = 'form-message is-ok';
        } catch (error) {
            console.error('Не удалось отправить предложение инструмента.', error);
            formMsg.textContent = error.message && error.message.indexOf('tool_suggestions') !== -1
                ? tr('suggest.tableMissing', 'Таблица предложений ещё не создана. Выполните обновлённый supabase-setup.sql в SQL Editor.')
                : tr('suggest.failed', 'Не удалось отправить предложение. Проверьте соединение и настройки базы данных.');
            formMsg.className = 'form-message is-error';
        } finally {
            submit.disabled = false;
        }
    });

    $('compare-add').addEventListener('click', function () {
        const selected = $('compare-picker').value;
        if (!selected || state.compare.indexOf(selected) !== -1 || state.compare.length >= 4) return;
        state.compare.push(selected);
        save();
        $('compare-message').textContent = '';
        renderAll();
    });
    $('compare-clear').addEventListener('click', function () {
        state.compare = [];
        save();
        $('compare-message').textContent = '';
        renderAll();
    });

    function markNav() {
        const h = location.hash || '';
        Array.prototype.forEach.call(document.querySelectorAll('.side-nav a'), function (a) {
            const href = a.getAttribute('href');
            if (href.charAt(0) === '#') a.classList.toggle('active', href === h);
            else if (href === 'main.html') a.classList.toggle('active', !h || h === '#');
        });
    }
    window.addEventListener('hashchange', markNav);

    const q = new URLSearchParams(location.search).get('q');
    if (q) { view.query = q; if (headerSearch) headerSearch.value = q; }
    renderAll();
    markNav();
    approvedToolsReady = loadApprovedTools();
    window.butleekApprovedToolsReady = approvedToolsReady;
})();