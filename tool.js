(async function () {
    'use strict';

    const tools = {
        react: {
            name: 'React', category: 'Интерфейс', icon: 'R', language: 'JavaScript / TypeScript',
            summary: 'Библиотека для создания интерфейсов из небольших переиспользуемых компонентов.',
            docs: 'https://react.dev/learn',
            install: 'npm create vite@latest my-app -- --template react',
            setup: [
                'Установите Node.js с сайта nodejs.org.',
                'Выполните команду создания проекта в терминале.',
                'Перейдите в папку проекта и запустите npm install, затем npm run dev.'
            ],
            template: 'export default function App() {\n  return <main>\n    <h1>Мой первый экран</h1>\n    <p>Начните с небольшого компонента.</p>\n  </main>;\n}',
            example: {
                title: 'Счётчик кликов',
                description: 'Компонент хранит число в состоянии и обновляет его по нажатию.',
                code: 'import { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Нажато: {count}\n    </button>\n  );\n}'
            },
            video: { id: 'SqcY0GlETPk', title: 'React Tutorial for Beginners — Programming with Mosh' },
            methods: [
                'Выносите повторяющиеся части интерфейса в отдельные компоненты.',
                'Для списков используйте стабильный key из данных.',
                'Показывайте отдельные состояния загрузки, ошибки и пустого результата.'
            ],
            tips: [
                'Разбивайте экран на компоненты с одной понятной задачей.',
                'Храните состояние рядом с тем компонентом, который его использует.',
                'Добавляйте TypeScript, когда проект и команда к этому готовы.'
            ]
        },
        fastapi: {
            name: 'FastAPI', category: 'Backend', icon: 'API', language: 'Python',
            summary: 'Фреймворк Python для создания API с проверкой типов и автоматически создаваемой документацией.',
            docs: 'https://fastapi.tiangolo.com/tutorial/',
            install: 'python -m pip install fastapi "uvicorn[standard]"',
            setup: [
                'Установите Python 3 и создайте отдельное виртуальное окружение.',
                'Установите FastAPI и Uvicorn командой выше.',
                'Создайте main.py с приложением FastAPI и запустите uvicorn main:app --reload.'
            ],
            template: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n\n@app.post("/items")\ndef create_item(item: Item):\n    return {"name": item.name}',
            example: {
                title: 'Проверка состояния API',
                description: 'Маршрут health удобно проверять после запуска сервера или перед деплоем.',
                code: '@app.get("/health")\ndef health_check():\n    return {"status": "ok"}'
            },
            video: { id: 'iWS9ogMPOI0', title: 'Python FastAPI Tutorial — pixegami' },
            methods: [
                'Описывайте входные и выходные данные Pydantic-моделями.',
                'Разделяйте обработчики API, бизнес-логику и доступ к данным.',
                'Покрывайте обработчики тестами через TestClient.'
            ],
            tips: [
                'Используйте модели Pydantic для проверки входных данных.',
                'Режим --reload подходит для разработки, но не для продакшена.',
                'Откройте /docs в браузере, чтобы проверить интерактивную документацию API.'
            ]
        },
        vite: {
            name: 'Vite', category: 'Сборка', icon: 'V', language: 'JavaScript / TypeScript',
            summary: 'Среда разработки и сборщик, который быстро запускает фронтенд-проект и собирает его для публикации.',
            docs: 'https://vite.dev/guide/',
            install: 'npm create vite@latest my-app',
            setup: [
                'Установите актуальную LTS-версию Node.js.',
                'Запустите команду и выберите шаблон проекта.',
                'В папке проекта выполните npm install и npm run dev.'
            ],
            template: 'npm run dev      # запуск разработки\nnpm run build    # production-сборка\nnpm run preview  # локальный просмотр сборки',
            example: {
                title: 'Проверка production-сборки',
                description: 'Сначала соберите проект, затем откройте локальный просмотр сборки.',
                code: 'npm run build\nnpm run preview'
            },
            video: { id: 'KCrXgy8qtjM', title: 'Vite in 100 Seconds — Fireship' },
            methods: [
                'Используйте npm run dev для разработки, а build — для проверки перед публикацией.',
                'Проверяйте собранную версию через npm run preview.',
                'Храните адреса окружений в переменных, не коммитьте секреты.'
            ],
            tips: [
                'Для production-сборки используйте npm run build.',
                'Храните переменные окружения с префиксом VITE_ и не помещайте туда секреты.',
                'Начинайте с минимального шаблона и добавляйте зависимости по мере необходимости.'
            ]
        },
        typescript: {
            name: 'TypeScript', category: 'Язык', icon: 'TS', language: 'TypeScript',
            summary: 'Надстройка над JavaScript со статической проверкой типов, которая помогает обнаруживать ошибки до запуска.',
            docs: 'https://www.typescriptlang.org/docs/',
            install: 'npm install --save-dev typescript',
            setup: [
                'Установите TypeScript в проект командой выше.',
                'Создайте конфигурацию командой npx tsc --init.',
                'Пишите исходный код в файлах .ts или .tsx и проверяйте его командой npx tsc --noEmit.'
            ],
            template: 'type User = {\n  id: number;\n  name: string;\n};\n\nfunction greeting(user: User): string {\n  return `Привет, ${user.name}`;\n}',
            example: {
                title: 'Подсчёт завершённых задач',
                description: 'Тип объединяет данные задачи, а функция принимает только массив таких объектов.',
                code: 'type Task = {\n  title: string;\n  done: boolean;\n};\n\nfunction countCompleted(tasks: Task[]): number {\n  return tasks.filter((task) => task.done).length;\n}'
            },
            video: { id: 'd56mG7DezGs', title: 'TypeScript Tutorial for Beginners — Programming with Mosh' },
            methods: [
                'Определяйте типы на границах приложения: формы, API и конфигурация.',
                'Используйте union-типы для ограниченного набора состояний.',
                'Начинайте с strict и делайте явные проверки неизвестных данных.'
            ],
            tips: [
                'Включите строгую проверку типов в tsconfig.json.',
                'Предпочитайте точные типы и проверки неизвестных данных вместо any.',
                'Добавляйте типизацию постепенно, если переносите существующий JavaScript-проект.'
            ]
        },
        postgresql: {
            name: 'PostgreSQL', category: 'База данных', icon: 'PG', language: 'SQL',
            summary: 'Надёжная реляционная база данных с транзакциями, индексами и широкими возможностями SQL.',
            docs: 'https://www.postgresql.org/docs/current/tutorial.html',
            install: 'Установите PostgreSQL: https://www.postgresql.org/download/',
            setup: [
                'Выберите установщик для своей операционной системы на официальном сайте.',
                'Создайте базу и отдельного пользователя для приложения.',
                'Подключитесь через psql или GUI-клиент и выполните первый SQL-запрос.'
            ],
            template: 'CREATE TABLE projects (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  name text NOT NULL,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE INDEX projects_name_idx ON projects (name);',
            example: {
                title: 'Сохранить и прочитать проект',
                description: 'Создайте строку и получите последние проекты сортировкой по дате.',
                code: "INSERT INTO projects (name) VALUES ('Мой сайт');\n\nSELECT id, name, created_at\nFROM projects\nORDER BY created_at DESC\nLIMIT 10;"
            },
            video: { id: 'qw--VYLpxG4', title: 'Learn PostgreSQL Tutorial — freeCodeCamp.org' },
            methods: [
                'Задавайте первичные и внешние ключи, чтобы поддерживать связи данных.',
                'Измеряйте медленные запросы перед добавлением индексов.',
                'Меняйте схему через миграции и проверяйте план сложных запросов.'
            ],
            tips: [
                'Храните изменения схемы в миграциях, а не только в ручных запросах.',
                'Используйте параметры запросов вместо склеивания SQL-строк.',
                'Регулярно создавайте резервные копии и проверяйте восстановление.'
            ]
        },
        docker: {
            name: 'Docker', category: 'Инфраструктура', icon: 'D', language: 'Dockerfile / YAML',
            summary: 'Упаковывает приложение и его зависимости в контейнеры, чтобы окружение было предсказуемым.',
            docs: 'https://docs.docker.com/get-started/',
            install: 'Установите Docker Desktop: https://www.docker.com/products/docker-desktop/',
            setup: [
                'Установите Docker Desktop или Docker Engine для своей системы.',
                'Добавьте Dockerfile с шагами сборки приложения.',
                'Соберите образ командой docker build -t my-app . и запустите его через docker run.'
            ],
            template: 'services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    env_file:\n      - .env',
            example: {
                title: 'Запустить тестовый веб-сервер',
                description: 'Docker скачает лёгкий образ Nginx и откроет его на localhost:8080.',
                code: 'docker run --rm -p 8080:80 nginx:alpine'
            },
            video: { id: 'DQdB7wFEygo', title: 'The Only Docker Tutorial You Need To Get Started — The Coding Sloth' },
            methods: [
                'Используйте Docker Compose, чтобы запускать связанные сервисы вместе.',
                'Не копируйте секреты в образ; передавайте их при запуске.',
                'Фиксируйте версии базовых образов и удаляйте лишние build-зависимости.'
            ],
            tips: [
                'Используйте .dockerignore, чтобы не копировать лишние файлы.',
                'Не записывайте пароли и токены внутрь образа или Dockerfile.',
                'Для нескольких сервисов изучите Docker Compose.'
            ]
        },
        eslint: {
            name: 'ESLint', category: 'Качество', icon: 'E', language: 'JavaScript / TypeScript',
            summary: 'Анализатор кода, который находит распространённые ошибки и помогает придерживаться единых правил.',
            docs: 'https://eslint.org/docs/latest/',
            install: 'npm init @eslint/config@latest',
            setup: [
                'В корне JavaScript-проекта запустите команду настройки.',
                'Ответьте на вопросы о языке, среде и формате модулей проекта.',
                'Запускайте npx eslint . для проверки исходного кода.'
            ],
            template: '"scripts": {\n  "lint": "eslint .",\n  "lint:fix": "eslint . --fix"\n}',
            example: {
                title: 'Проверить исходный код',
                description: 'Запустите ESLint для папки с кодом; добавьте --fix только если хотите автоматически применить доступные исправления.',
                code: 'npx eslint src'
            },
            video: { id: 'eieTlMwCwWU', title: 'How to Set Up ESLint — The Common Coder' },
            methods: [
                'Запускайте линтер перед коммитом и в CI.',
                'Исправляйте ошибки линтера до отключения правила.',
                'Договоритесь в команде об одном наборе форматирования и правил.'
            ],
            tips: [
                'Поддерживайте конфигурацию правил в репозитории команды.',
                'Добавьте lint-команду в package.json, чтобы запускать проверку одинаково.',
                'Не отключайте правило глобально, если достаточно точечного исключения.'
            ]
        },
        git: {
            name: 'Git', category: 'Рабочий процесс', icon: 'Git', language: 'Командная строка',
            summary: 'Система контроля версий для истории изменений и совместной работы над кодом.',
            docs: 'https://git-scm.com/book/ru/v2',
            install: 'Установите Git: https://git-scm.com/downloads',
            setup: [
                'Установите Git и задайте имя и почту командой git config --global.',
                'В папке проекта выполните git init.',
                'Добавляйте изменения через git add и сохраняйте их командой git commit.'
            ],
            template: 'git status\ngit add src/\ngit commit -m "Добавляет страницу профиля"\ngit push',
            example: {
                title: 'Отдельная ветка для задачи',
                description: 'Создайте ветку, сохраните готовое изменение и отправьте её в общий репозиторий.',
                code: 'git switch -c feature/profile\ngit status\ngit add src/\ngit commit -m "Добавляет профиль"\ngit push -u origin feature/profile'
            },
            video: { id: 'e9lnsKot_SQ', title: 'How Git Works: Explained in 4 Minutes — ByteByteGo' },
            methods: [
                'Создавайте небольшие ветки для отдельных задач.',
                'Перед коммитом проверяйте git diff и git status.',
                'Синхронизируйте изменения с основной веткой регулярно, а не только перед релизом.'
            ],
            tips: [
                'Делайте небольшие коммиты с понятными сообщениями.',
                'Не добавляйте в Git файлы с паролями, токенами и локальными настройками.',
                'Перед отправкой изменений проверьте git status и актуальность основной ветки.'
            ]
        }
    };

    const root = document.getElementById('tool-detail');
    const id = new URLSearchParams(window.location.search).get('id');
    let tool = tools[id];
    if (!tool && id && id.indexOf('custom-') === 0) {
        try {
            const saved = JSON.parse(localStorage.getItem('butleek:v1') || '{}');
            const custom = Array.isArray(saved.custom) ? saved.custom : [];
            for (let i = 0; i < custom.length; i++) {
                if (custom[i].id === id) {
                    tool = {
                        name: custom[i].name,
                        category: custom[i].category,
                        icon: custom[i].name.slice(0, 2).toUpperCase(),
                        language: custom[i].lang || 'Не указан',
                        summary: custom[i].desc,
                        template: 'Начните с минимального примера и сверяйтесь с официальной документацией.',
                        methods: [
                            'Сначала проверьте инструмент на небольшом изолированном примере.',
                            'Зафиксируйте настройки проекта и объясните их команде.',
                            'Добавляйте инструмент, только если он решает конкретную задачу.'
                        ],
                        setup: [
                            'Уточните официальные инструкции по установке на сайте инструмента.',
                            'Добавьте инструмент в проект согласно его документации.',
                            'Проверьте настройку на небольшом примере перед использованием в проекте.'
                        ],
                        tips: [
                            'Начните с официальной документации и актуальной версии.',
                            'Проверьте совместимость инструмента с вашим стеком.',
                            'Не добавляйте секреты и личные данные в конфигурацию проекта.'
                        ]
                    };
                    break;
                }
            }
        } catch (error) {
            console.error('Не удалось загрузить пользовательский инструмент.', error);
        }
    }

    if (!tool && id && id.indexOf('approved-') === 0) {
        try {
            const client = window.butleekSupabase || await window.butleekSupabaseReady;
            if (!client) throw new Error('Supabase is unavailable.');

            const { data, error } = await client
                .from('approved_tools')
                .select('id, name, category, website, description')
                .eq('id', id)
                .maybeSingle();
            if (error) throw error;

            if (data) {
                tool = {
                    name: data.name,
                    category: data.category,
                    icon: data.name.slice(0, 2).toUpperCase(),
                    language: tr('tool.approvedEnvironment', 'Зависит от инструмента'),
                    summary: data.description,
                    docs: data.website,
                    setup: [
                        tr('tool.approvedSetup1', 'Откройте официальный сайт и проверьте актуальные требования.'),
                        tr('tool.approvedSetup2', 'Следуйте официальной инструкции для вашей системы и проекта.'),
                        tr('tool.approvedSetup3', 'Сначала проверьте инструмент на небольшом тестовом проекте.')
                    ],
                    methods: [
                        tr('tool.approvedMethod1', 'Начните с официальной документации и поддерживаемой версии.'),
                        tr('tool.approvedMethod2', 'Проверьте совместимость инструмента с вашим стеком.'),
                        tr('tool.approvedMethod3', 'Проверьте результат перед внедрением в основной проект.')
                    ],
                    tips: [
                        tr('tool.approvedTip1', 'Проверьте лицензию и условия использования на официальном сайте.'),
                        tr('tool.approvedTip2', 'Не добавляйте пароли и токены в открытый код.'),
                        tr('tool.approvedTip3', 'Следите за официальными обновлениями инструмента.')
                    ]
                };
            }
        } catch (error) {
            console.error('Не удалось загрузить принятый инструмент.', error);
        }
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function tr(key, fallback, values) {
        return window.butleekTranslate ? window.butleekTranslate(key, values) : fallback;
    }

    function addListSection(parent, title, items, ordered) {
        const section = element('section', 'tool-detail-section');
        section.appendChild(element('h2', '', title));
        const list = document.createElement(ordered ? 'ol' : 'ul');
        items.forEach(function (item) { list.appendChild(element('li', '', item)); });
        section.appendChild(list);
        parent.appendChild(section);
    }

    function addCodeSection(parent, title, description, source, copyLabel) {
        const section = element('section', 'tool-detail-section');
        section.appendChild(element('h2', '', title));
        if (description) section.appendChild(element('p', 'section-meta', description));
        const code = element('code', '', source);
        const block = element('pre', 'command-block');
        block.appendChild(code);
        section.appendChild(block);
        const copy = element('button', 'button button-secondary', copyLabel);
        copy.type = 'button';
        const status = element('span', 'section-meta', '');
        status.setAttribute('role', 'status');
        copy.addEventListener('click', function () {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                status.textContent = tr('tool.copyUnavailable', 'Копирование недоступно. Выделите текст и скопируйте вручную.');
                return;
            }
            navigator.clipboard.writeText(source).then(function () {
                status.textContent = tr('tool.copySuccess', 'Текст скопирован.');
            }).catch(function (error) {
                console.error('Не удалось скопировать пример.', error);
                status.textContent = tr('tool.copyFailed', 'Не удалось скопировать. Выделите текст и скопируйте вручную.');
            });
        });
        section.appendChild(copy);
        section.appendChild(status);
        parent.appendChild(section);
    }

    if (!tool) {
        root.textContent = '';
        root.appendChild(element('h1', 'page-title', tr('tool.notFound', 'Инструмент не найден')));
        root.appendChild(element('p', 'page-description', tr('tool.notFoundDescription', 'Вернитесь в каталог и выберите инструмент из списка.')));
        root.appendChild(element('a', 'button button-primary', tr('tool.openCatalog', 'Открыть каталог')));
        root.lastChild.href = 'main.html#catalog';
        return;
    }

    document.title = tool.name + ' — But|Leek';
    root.textContent = '';
    const intro = element('section', 'tool-detail-hero');
    intro.appendChild(element('span', 'tool-icon tool-icon-large', tool.icon));
    const heading = element('div', '');
    heading.appendChild(element('span', 'tool-category',
        window.butleekCategoryName ? window.butleekCategoryName(tool.category) : tool.category));
    heading.appendChild(element('h1', 'page-title', tool.name));
    heading.appendChild(element('p', 'page-description', tool.summary));
    heading.appendChild(element('p', 'section-meta', tr('tool.language', 'Язык / среда') + ': ' + tool.language));
    intro.appendChild(heading);
    root.appendChild(intro);

    if (tool.docs) {
        const docs = element('a', 'button button-primary', tr('tool.docs', 'Официальная документация'));
        docs.href = tool.docs;
        docs.target = '_blank';
        docs.rel = 'noopener noreferrer';
        const actions = element('div', 'tool-detail-actions');
        actions.appendChild(docs);
        root.appendChild(actions);
    }

    if (tool.install) {
        const install = element('section', 'tool-detail-section');
        install.appendChild(element('h2', '', tr('tool.install', 'Установка')));
        const code = element('code', '', tool.install);
        const command = element('pre', 'command-block');
        command.appendChild(code);
        install.appendChild(command);
        const copy = element('button', 'button button-secondary', tr('tool.copy', 'Скопировать'));
        copy.type = 'button';
        const copyStatus = element('span', 'section-meta', '');
        copyStatus.setAttribute('role', 'status');
        copy.addEventListener('click', function () {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                copyStatus.textContent = tr('tool.copyUnavailable', 'Копирование недоступно. Выделите текст и скопируйте вручную.');
                return;
            }
            navigator.clipboard.writeText(tool.install).then(function () {
                copyStatus.textContent = tr('tool.copySuccess', 'Текст скопирован.');
            }).catch(function (error) {
                console.error('Не удалось скопировать команду.', error);
                copyStatus.textContent = tr('tool.copyFailed', 'Не удалось скопировать. Выделите текст и скопируйте вручную.');
            });
        });
        install.appendChild(copy);
        install.appendChild(copyStatus);
        root.appendChild(install);
    }

    addListSection(root, tr('tool.setup', 'Как подключить'), tool.setup, true);

    if (tool.template) {
        addCodeSection(root, tr('tool.template', 'Полезный шаблон'),
            tr('tool.templateDescription', 'Стартовый пример: адаптируйте его к структуре своего проекта.'),
            tool.template, tr('tool.copyTemplate', 'Скопировать шаблон'));
    }
    if (tool.example) {
        addCodeSection(root, tr('tool.exampleTitle', 'Пример использования: {title}', { title: tool.example.title }),
            tool.example.description, tool.example.code, tr('tool.copyExample', 'Скопировать пример'));
    }

    addListSection(root, tr('tool.methods', 'Методы и рабочие приёмы'), tool.methods, false);
    addListSection(root, tr('tool.tips', 'Советы разработчикам'), tool.tips, false);

    const learning = element('section', 'tool-detail-section');
    learning.appendChild(element('h2', '', tr('tool.learning', 'Туториалы и видео')));
    if (tool.docs) {
        const docsLink = element('a', 'resource-link', tr('tool.officialTutorial', 'Официальный туториал: {name}', { name: tool.name }));
        docsLink.href = tool.docs;
        docsLink.target = '_blank';
        docsLink.rel = 'noopener noreferrer';
        learning.appendChild(docsLink);
    }
    if (tool.video) {
        const player = element('div', 'tutorial-player');
        const preview = element('button', 'video-preview');
        preview.type = 'button';
        preview.setAttribute('aria-label', tr('tool.playVideo', 'Включить видео: {title}', { title: tool.video.title }));
        const thumbnail = element('img', '');
        thumbnail.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(tool.video.id) + '/hqdefault.jpg';
        thumbnail.alt = '';
        thumbnail.loading = 'lazy';
        thumbnail.setAttribute('aria-hidden', 'true');
        preview.appendChild(thumbnail);
        preview.appendChild(element('span', 'video-play-icon', tr('tool.playVideoLabel', 'Смотреть видео')));
        preview.addEventListener('click', function () {
            const frame = element('iframe', 'video-frame');
            frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(tool.video.id) + '?autoplay=1&rel=0';
            frame.title = tool.video.title;
            frame.allow = 'autoplay; encrypted-media; picture-in-picture';
            frame.allowFullscreen = true;
            frame.loading = 'eager';
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            player.replaceChild(frame, preview);
        });
        player.appendChild(preview);
        player.appendChild(element('p', 'video-caption', tool.video.title));
        learning.appendChild(player);
    }
    const videoLink = element('a', 'resource-link', tool.video
        ? tr('tool.openVideo', 'Открыть видео на YouTube')
        : tr('tool.findVideo', 'Найти видеоруководства по {name}', { name: tool.name }));
    videoLink.href = tool.video
        ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(tool.video.id)
        : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(tool.name + ' tutorial');
    videoLink.target = '_blank';
    videoLink.rel = 'noopener noreferrer';
    learning.appendChild(videoLink);
    learning.appendChild(element('p', 'form-note', tr('tool.resourceNote', 'Выбирайте свежие уроки и проверяйте команды по официальной документации.')));
    root.appendChild(learning);
})();
