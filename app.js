(function () {
    'use strict';

    const KEY = 'butleek:settings';
    const form = document.querySelector('.settings-card');
    const search = document.querySelector('.search-box input');
    const defaults = { theme: 'light', language: 'ru' };
    const copy = {
        ru: {
            'nav.library': 'Библиотека', 'nav.feed': 'Лента', 'nav.catalog': 'Каталог',
            'nav.collections': 'Подборки', 'nav.favorites': 'Избранное', 'nav.compare': 'Сравнение',
            'nav.suggest': 'Предложить инструмент', 'nav.settings': 'Настройки', 'nav.profile': 'Мой профиль',
            'nav.community': 'Сообщество',
            'nav.logout': 'Выйти', 'nav.primary': 'Основная навигация',
            'nav.secondary': 'Дополнительная навигация', 'feed.tools': 'Инструменты',
            'auth.notConfigured': 'Авторизация не настроена. Заполните URL проекта и публичный ключ Supabase.',
            'auth.libraryUnavailable': 'Не удалось загрузить библиотеку авторизации. Проверьте подключение к интернету.',
            'auth.connecting': 'Подключаем авторизацию. Подождите немного и попробуйте ещё раз.',
            'auth.sessionError': 'Не удалось проверить вход. Обновите страницу или попробуйте позже.',
            'search.placeholder': 'Поиск инструментов',
            'search.label': 'Поиск инструментов',
            'catalog.filter': 'Фильтр по категориям', 'compare.picker': 'Инструмент для сравнения',
            'settings.title': 'Настройки', 'settings.description': 'Выберите тему и язык интерфейса.',
            'settings.theme': 'Тема', 'settings.language': 'Язык интерфейса',
            'settings.save': 'Сохранить', 'settings.reset': 'Сбросить',
            'settings.saved': 'Настройки сохранены.', 'settings.resetDone': 'Настройки сброшены.',
            'settings.saveError': 'Не удалось сохранить настройки. Проверьте доступ браузера к хранилищу.',
            'storage.readError': 'Не удалось прочитать сохранённые данные. Показаны значения по умолчанию.',
            'storage.saveError': 'Не удалось сохранить изменения. Проверьте доступ браузера к хранилищу.',
            'theme.light': 'Светлая', 'theme.dark': 'Тёмная', 'theme.forest': 'Лесная',
            'theme.lavender': 'Лавандовая', 'theme.terracotta': 'Терракотовая', 'theme.system': 'Как в системе',
            'profile.title': 'Мой профиль',
            'profile.summary': 'Расскажите о своём опыте и проектах — профиль станет полезнее для вас.',
            'profile.greeting': 'Профиль {name}',
            'profile.library': 'Ваша библиотека', 'profile.favorites': 'Избранное',
            'profile.local': 'На этом устройстве', 'profile.compare': 'В сравнении',
            'profile.continue': 'Продолжить выбор', 'profile.personal': 'Личные данные',
            'profile.firstName': 'Имя', 'profile.lastName': 'Фамилия', 'profile.nickname': 'Никнейм',
            'profile.email': 'Почта', 'profile.birthday': 'Дата рождения', 'profile.developer': 'О разработчике',
            'profile.focus': 'Направление', 'profile.focusSelect': 'Выберите направление',
            'profile.experience': 'Опыт', 'profile.experienceSelect': 'Выберите уровень',
            'profile.project': 'Над чем сейчас работаете?',
            'profile.projectPlaceholder': 'Например, личный сайт или API для приложения',
            'profile.security': 'Безопасность',
            'profile.securityText': 'Для смены пароля отправим безопасную ссылку на почту аккаунта.',
            'profile.changePassword': 'Изменить пароль', 'profile.save': 'Сохранить изменения',
            'profile.saveNote': 'Изменения применяются только после сохранения.',
            'profile.saved': 'Профиль сохранён.',
            'profile.personalize': 'Настройте профиль под свои задачи.',
            'profile.addFocus': 'Добавьте направление, чтобы персонализировать своё пространство.',
            'profile.saveError': 'Не удалось сохранить изменения. Попробуйте ещё раз.',
            'profile.emailMissing': 'Не удалось получить почту аккаунта. Войдите заново.',
            'profile.passwordSent': 'Ссылка для смены пароля отправлена на почту аккаунта.',
            'profile.passwordError': 'Не удалось отправить письмо. Попробуйте ещё раз.',
            'profile.schemaError': 'Таблица профиля не найдена. Выполните supabase-setup.sql в SQL Editor проекта.',
            'profile.columnsError': 'Структура профиля устарела. Повторно выполните supabase-setup.sql в SQL Editor проекта.',
            'profile.permissionError': 'Нет доступа к профилю. Проверьте RLS-политики из supabase-setup.sql.',
            'role.frontend': 'Frontend', 'role.backend': 'Backend', 'role.fullstack': 'Full-stack',
            'role.mobile': 'Мобильная разработка', 'role.design': 'Дизайн', 'role.other': 'Другое',
            'experience.beginner': 'Начинаю', 'experience.learning': 'Учусь и практикуюсь',
            'experience.working': 'Работаю в разработке', 'experience.advanced': 'Опытный специалист',
            'feed.title': 'Лента инструментов',
            'feed.description': 'Подбирайте инструменты, собирайте стек и сравнивайте варианты.',
            'feed.starterBadge': 'Подборка для старта', 'feed.starterTitle': 'Стек для первого проекта',
            'feed.starterDescription': 'Понятный маршрут от интерфейса до базы данных и запуска приложения.',
            'feed.starterButton': 'Посмотреть стек',
            'feed.catalog': 'Каталог инструментов', 'feed.collections': 'Подборки',
            'feed.favorites': 'Избранное', 'feed.compare': 'Сравнение',
            'feed.suggest': 'Предложить инструмент',
            'catalog.all': 'Все', 'catalog.resetCollection': 'Подборка: {name} ✕',
            'catalog.noResults': 'Ничего не найдено. Измените запрос или сбросьте фильтры.',
            'catalog.shown': 'Показано {shown} из {total}',
            'favorites.empty': 'Пока пусто. Нажмите значок закладки на карточке, чтобы сохранить инструмент.',
            'favorites.remove': 'Убрать', 'favorites.open': 'Открыть',
            'compare.empty': 'Добавьте инструменты в сравнение с помощью кнопки на карточке.',
            'compare.selected': 'Выбрано {count} из 4', 'compare.addLabel': 'Добавить к сравнению',
            'compare.add': 'Добавить', 'compare.clear': 'Очистить сравнение',
            'compare.remove': 'Убрать', 'compare.criteria': 'Критерий',
            'compare.removeNamed': 'Убрать из сравнения: {name}',
            'compare.role': 'Роль в стеке', 'compare.task': 'Что решает',
            'compare.requirements': 'Что понадобится', 'compare.environment': 'Язык / среда',
            'compare.level': 'Что нужно освоить', 'compare.cost': 'Лицензия и стоимость',
            'compare.good': 'Хороший выбор, если…', 'compare.consider': 'Ограничения',
            'compare.roleFallback': 'Сверьтесь с описанием инструмента и документацией',
            'compare.requirementsFallback': 'Зависят от выбранного стека и способа запуска',
            'compare.levelFallback': 'Сложность зависит от вашего опыта и проекта',
            'compare.priceFallback': 'Проверьте условия и лицензию на официальном сайте',
            'compare.considerFallback': 'Перед выбором проверьте документацию и совместимость.',
            'compare.limit': 'Для удобства сравнения выберите не больше четырёх инструментов.',
            'compare.note': 'Таблицу можно прокручивать по горизонтали. Условия и лицензии могут меняться — проверяйте официальную документацию.',
            'catalog.favoriteRemove': 'Убрать из избранного: {name}',
            'catalog.favoriteAdd': 'В избранное: {name}', 'catalog.favoriteTitleRemove': 'Убрать из избранного',
            'catalog.favoriteTitleAdd': 'Сохранить в избранное', 'catalog.comparing': 'В сравнении',
            'catalog.compareAdd': 'Сравнить', 'catalog.details': 'Подробнее',
            'suggest.duplicate': 'Инструмент «{name}» уже есть в каталоге. Найдите его через поиск.',
            'suggest.unavailable': 'Сервис предложений недоступен. Проверьте подключение к Supabase и обновите страницу.',
            'suggest.login': 'Войдите в аккаунт, чтобы отправить предложение на проверку.',
            'suggest.sent': 'Предложение отправлено команде на проверку. В каталог оно попадёт только после одобрения.',
            'suggest.tableMissing': 'Таблица предложений ещё не создана. Выполните обновлённый supabase-setup.sql в SQL Editor.',
            'suggest.failed': 'Не удалось отправить предложение. Проверьте соединение и настройки базы данных.',
            'suggest.name': 'Название', 'suggest.category': 'Категория',
            'suggest.website': 'Официальный сайт или документация', 'suggest.description': 'Чем он полезен?',
            'suggest.reason': 'Почему стоит добавить его в каталог?', 'suggest.submit': 'Отправить команде',
            'suggest.reviewNote': 'Предложение не появится в каталоге сразу. Отправка доступна после входа в аккаунт.',
            'suggest.namePlaceholder': 'Например, Astro',
            'suggest.descriptionPlaceholder': 'Какую задачу решает инструмент и кому пригодится?',
            'suggest.reasonPlaceholder': 'Например, он удобен для ... и дополняет ...',
            'suggest.catalogCheckFailed': 'Не удалось проверить общий каталог. Обновите страницу перед отправкой.',
            'suggest.websiteInvalid': 'Укажите сайт с адресом, начинающимся на http:// или https://.',
            'catalog.approvedLoadError': 'Не удалось загрузить принятые инструменты. Выполните обновлённый supabase-setup.sql.',
            'adminSuggestions.title': 'Предложения на проверку',
            'adminSuggestions.refresh': 'Обновить',
            'adminSuggestions.loading': 'Загружаем предложения…',
            'adminSuggestions.loadError': 'Не удалось загрузить предложения. Попробуйте обновить список.',
            'adminSuggestions.pendingCount': 'Ожидают проверки: {count}',
            'adminSuggestions.empty': 'Новых предложений пока нет.',
            'adminSuggestions.category': 'Категория',
            'adminSuggestions.website': 'Сайт или документация',
            'adminSuggestions.description': 'Описание',
            'adminSuggestions.reason': 'Почему стоит добавить',
            'adminSuggestions.pending': 'На проверке',
            'adminSuggestions.approved': 'Принято',
            'adminSuggestions.rejected': 'Отклонено',
            'adminSuggestions.rejectedMessage': 'Предложение отклонено.',
            'adminSuggestions.alreadyPublished': 'Уже в каталоге',
            'adminSuggestions.catalogUnavailable': 'Не удалось загрузить каталог: обновите страницу после настройки Supabase.',
            'adminSuggestions.duplicate': 'Этот инструмент уже опубликован в каталоге.',
            'adminSuggestions.accept': 'Принять и опубликовать',
            'adminSuggestions.reject': 'Отклонить',
            'adminSuggestions.saving': 'Сохраняем решение…',
            'adminSuggestions.accepted': 'Предложение принято, инструмент опубликован в каталоге.',
            'adminSuggestions.acceptedCatalogRefreshFailed': 'Предложение принято, но каталог не обновился. Перезагрузите страницу.',
            'adminSuggestions.updateError': 'Не удалось сохранить решение. Обновите SQL Supabase и попробуйте ещё раз.',
            'tool.approvedEnvironment': 'Зависит от инструмента',
            'tool.approvedSetup1': 'Откройте официальный сайт и проверьте актуальные требования.',
            'tool.approvedSetup2': 'Следуйте официальной инструкции для вашей системы и проекта.',
            'tool.approvedSetup3': 'Сначала проверьте инструмент на небольшом тестовом проекте.',
            'tool.approvedMethod1': 'Начните с официальной документации и поддерживаемой версии.',
            'tool.approvedMethod2': 'Проверьте совместимость инструмента с вашим стеком.',
            'tool.approvedMethod3': 'Проверьте результат перед внедрением в основной проект.',
            'tool.approvedTip1': 'Проверьте лицензию и условия использования на официальном сайте.',
            'tool.approvedTip2': 'Не добавляйте пароли и токены в открытый код.',
            'tool.approvedTip3': 'Следите за официальными обновлениями инструмента.',
            'community.title': 'Стена сообщества',
            'community.description': 'Покажите, как инструменты помогают в ваших проектах.',
            'community.loading': 'Загружаем публикации…',
            'community.loadError': 'Не удалось загрузить стену. Обновите страницу и попробуйте ещё раз.',
            'community.unavailable': 'Стена сообщества недоступна: проверьте подключение к Supabase.',
            'community.login': 'Войдите, чтобы поделиться своей историей.',
            'community.tool': 'Инструмент',
            'community.project': 'Над чем работаете?',
            'community.usage': 'Как используете инструмент?',
            'community.message': 'Ваш комментарий',
            'community.commentLabel': 'Комментарий',
            'community.toolPlaceholder': 'Например, React',
            'community.projectPlaceholder': 'Например, сайт-портфолио',
            'community.usagePlaceholder': 'Что именно вы делаете с этим инструментом?',
            'community.messagePlaceholder': 'Поделитесь опытом или советом',
            'community.photo': 'Фото проекта (необязательно, до 5 МБ)',
            'community.publish': 'Опубликовать стикер',
            'community.empty': 'Пока нет историй. Поделитесь первой!',
            'community.member': 'Участник сообщества',
            'community.delete': 'Удалить стикер',
            'community.deleteConfirm': 'Удалить эту публикацию? Это действие нельзя отменить.',
            'community.deleteSuccess': 'Публикация удалена.',
            'community.deleteFailed': 'Не удалось удалить публикацию.',
            'community.photoType': 'Выберите изображение в формате JPG, PNG или WebP.',
            'community.photoSize': 'Размер изображения не должен превышать 5 МБ.',
            'community.publishFailed': 'Не удалось опубликовать. Проверьте подключение и настройки Supabase.',
            'community.publishSuccess': 'Стикер опубликован.',
            'community.imageCleanupFailed': 'Публикация удалена, но изображение не удалось очистить. Сообщите администратору.',
            'community.photoAlt': 'Фото проекта для {tool}',
            'community.toolLabel': 'Инструмент',
            'community.projectLabel': 'Проект',
            'community.usageLabel': 'Как использую',
            'category.interface': 'Интерфейс', 'category.backend': 'Backend', 'category.build': 'Сборка',
            'category.language': 'Язык', 'category.database': 'База данных',
            'category.infrastructure': 'Инфраструктура', 'category.quality': 'Качество',
            'category.workflow': 'Рабочий процесс', 'category.other': 'Другое',
            'tool.back': 'Вернуться в каталог', 'tool.loading': 'Загружаем информацию об инструменте…',
            'tool.notFound': 'Инструмент не найден',
            'tool.notFoundDescription': 'Вернитесь в каталог и выберите инструмент из списка.',
            'tool.openCatalog': 'Открыть каталог', 'tool.docs': 'Официальная документация',
            'tool.install': 'Установка', 'tool.copy': 'Скопировать', 'tool.setup': 'Как подключить',
            'tool.template': 'Полезный шаблон',
            'tool.templateDescription': 'Стартовый пример: адаптируйте его к структуре своего проекта.',
            'tool.copyTemplate': 'Скопировать шаблон', 'tool.exampleTitle': 'Пример использования: {title}',
            'tool.copyExample': 'Скопировать пример', 'tool.methods': 'Методы и рабочие приёмы',
            'tool.tips': 'Советы разработчикам', 'tool.learning': 'Туториалы и видео',
            'tool.language': 'Язык / среда', 'tool.playVideo': 'Включить видео: {title}',
            'tool.playVideoLabel': 'Смотреть видео',
            'tool.officialTutorial': 'Официальный туториал: {name}',
            'tool.findVideo': 'Найти видеоруководства по {name}',
            'tool.openVideo': 'Открыть видео на YouTube',
            'tool.resourceNote': 'Выбирайте свежие уроки и проверяйте команды по официальной документации.',
            'tool.copyUnavailable': 'Копирование недоступно. Выделите текст и скопируйте вручную.',
            'tool.copySuccess': 'Текст скопирован.',
            'tool.copyFailed': 'Не удалось скопировать. Выделите текст и скопируйте вручную.',
            'collection.first': 'Первый веб-проект',
            'collection.firstDescription': 'Интерфейс, сервер, данные и публикация — всё необходимое для старта.',
            'collection.workflow': 'Рабочий процесс',
            'collection.workflowDescription': 'Инструменты для сборки, контроля качества и общего окружения.'
        },
        kk: {
            'nav.library': 'Кітапхана', 'nav.feed': 'Таспа', 'nav.catalog': 'Каталог',
            'nav.collections': 'Жинақтар', 'nav.favorites': 'Таңдаулылар', 'nav.compare': 'Салыстыру',
            'nav.suggest': 'Құрал ұсыну', 'nav.settings': 'Баптаулар', 'nav.profile': 'Профиль',
            'nav.community': 'Қауымдастық',
            'nav.logout': 'Шығу', 'nav.primary': 'Негізгі навигация',
            'nav.secondary': 'Қосымша навигация', 'feed.tools': 'Құралдар',
            'auth.notConfigured': 'Авторизация бапталмаған. Жоба URL-і мен Supabase ашық кілтін енгізіңіз.',
            'auth.libraryUnavailable': 'Авторизация кітапханасы жүктелмеді. Интернет байланысын тексеріңіз.',
            'auth.connecting': 'Авторизация қосылуда. Сәл күтіп, қайта көріңіз.',
            'auth.sessionError': 'Кіруді тексеру мүмкін болмады. Бетті жаңартып, қайталап көріңіз.',
            'search.placeholder': 'Құралдарды іздеу',
            'search.label': 'Құралдарды іздеу',
            'catalog.filter': 'Санат бойынша сүзу', 'compare.picker': 'Салыстыру құралы',
            'settings.title': 'Баптаулар', 'settings.description': 'Тақырып пен интерфейс тілін таңдаңыз.',
            'settings.theme': 'Тақырып', 'settings.language': 'Интерфейс тілі',
            'settings.save': 'Сақтау', 'settings.reset': 'Қалпына келтіру',
            'settings.saved': 'Баптаулар сақталды.', 'settings.resetDone': 'Баптаулар қалпына келтірілді.',
            'settings.saveError': 'Баптауларды сақтау мүмкін болмады. Браузердің сақтау рұқсатын тексеріңіз.',
            'storage.readError': 'Сақталған деректерді оқу мүмкін болмады. Әдепкі мәндер көрсетілді.',
            'storage.saveError': 'Өзгерістерді сақтау мүмкін болмады. Браузердің сақтау рұқсатын тексеріңіз.',
            'theme.light': 'Ашық', 'theme.dark': 'Қараңғы', 'theme.forest': 'Орман',
            'theme.lavender': 'Лаванда', 'theme.terracotta': 'Қыш түсті', 'theme.system': 'Жүйе бойынша',
            'profile.title': 'Менің профилім',
            'profile.summary': 'Тәжірибеңіз бен жобаларыңыз туралы айтып, профиліңізді пайдалы етіңіз.',
            'profile.greeting': '{name} профилі',
            'profile.library': 'Кітапханаңыз', 'profile.favorites': 'Таңдаулылар',
            'profile.local': 'Осы құрылғыда', 'profile.compare': 'Салыстыруда',
            'profile.continue': 'Таңдауды жалғастыру', 'profile.personal': 'Жеке деректер',
            'profile.firstName': 'Аты', 'profile.lastName': 'Тегі', 'profile.nickname': 'Лақап ат',
            'profile.email': 'Электрондық пошта', 'profile.birthday': 'Туған күні', 'profile.developer': 'Әзірлеуші туралы',
            'profile.focus': 'Бағыты', 'profile.focusSelect': 'Бағытты таңдаңыз',
            'profile.experience': 'Тәжірибе', 'profile.experienceSelect': 'Деңгейді таңдаңыз',
            'profile.project': 'Қазір немен айналысып жатырсыз?',
            'profile.projectPlaceholder': 'Мысалы, жеке сайт немесе қолданба API-і',
            'profile.security': 'Қауіпсіздік',
            'profile.securityText': 'Құпиясөзді өзгерту сілтемесі аккаунт поштаңызға жіберіледі.',
            'profile.changePassword': 'Құпиясөзді өзгерту', 'profile.save': 'Өзгерістерді сақтау',
            'profile.saveNote': 'Өзгерістер тек сақталғаннан кейін қолданылады.',
            'profile.saved': 'Профиль сақталды.',
            'profile.personalize': 'Профиліңізді міндеттеріңізге сай баптаңыз.',
            'profile.addFocus': 'Профильді бейімдеу үшін бағытыңызды қосыңыз.',
            'profile.saveError': 'Өзгерістерді сақтау мүмкін болмады. Қайталап көріңіз.',
            'profile.emailMissing': 'Аккаунт поштаңызды алу мүмкін болмады. Қайта кіріңіз.',
            'profile.passwordSent': 'Құпиясөзді өзгерту сілтемесі поштаңызға жіберілді.',
            'profile.passwordError': 'Хатты жіберу мүмкін болмады. Қайталап көріңіз.',
            'profile.schemaError': 'Профиль кестесі табылмады. Supabase SQL Editor ішінде supabase-setup.sql файлын орындаңыз.',
            'profile.columnsError': 'Профиль кестесінің құрылымы ескі. supabase-setup.sql файлын қайта орындаңыз.',
            'profile.permissionError': 'Профильге рұқсат жоқ. supabase-setup.sql файлындағы RLS саясаттарын тексеріңіз.',
            'role.frontend': 'Frontend', 'role.backend': 'Backend', 'role.fullstack': 'Full-stack',
            'role.mobile': 'Мобильді әзірлеу', 'role.design': 'Дизайн', 'role.other': 'Басқа',
            'experience.beginner': 'Бастап жүрмін', 'experience.learning': 'Оқып, тәжірибе жинап жүрмін',
            'experience.working': 'Әзірлеу саласында жұмыс істеймін', 'experience.advanced': 'Тәжірибелі маман',
            'feed.title': 'Құралдар таспасы',
            'feed.description': 'Құралдарды таңдаңыз, технологиялар жиынын құрыңыз және салыстырыңыз.',
            'feed.starterBadge': 'Бастауға арналған жинақ', 'feed.starterTitle': 'Алғашқы жобаға арналған стек',
            'feed.starterDescription': 'Интерфейстен дерекқор мен қосымшаны іске қосуға дейінгі жол.',
            'feed.starterButton': 'Жинақты көру',
            'feed.catalog': 'Құралдар каталогы', 'feed.collections': 'Жинақтар',
            'feed.favorites': 'Таңдаулылар', 'feed.compare': 'Салыстыру',
            'feed.suggest': 'Құрал ұсыну',
            'catalog.all': 'Барлығы', 'catalog.resetCollection': 'Жинақ: {name} ✕',
            'catalog.noResults': 'Ештеңе табылмады. Іздеу сөзін өзгертіңіз немесе сүзгілерді тазалаңыз.',
            'catalog.shown': '{total} ішінен {shown} көрсетілді',
            'favorites.empty': 'Әзірге бос. Құралды сақтау үшін карточкадағы бетбелгіні басыңыз.',
            'favorites.remove': 'Алып тастау', 'favorites.open': 'Ашу',
            'compare.empty': 'Құралдарды карточкадағы батырма арқылы салыстыруға қосыңыз.',
            'compare.selected': '{count} / 4 таңдалды', 'compare.addLabel': 'Салыстыруға қосу',
            'compare.add': 'Қосу', 'compare.clear': 'Салыстыруды тазалау',
            'compare.remove': 'Алып тастау', 'compare.criteria': 'Өлшем',
            'compare.removeNamed': 'Салыстырудан алып тастау: {name}',
            'compare.role': 'Стектегі рөлі', 'compare.task': 'Не шешеді',
            'compare.requirements': 'Не қажет болады', 'compare.environment': 'Тіл / орта',
            'compare.level': 'Нені меңгеру керек', 'compare.cost': 'Лицензия және құны',
            'compare.good': 'Қай кезде қолайлы…', 'compare.consider': 'Шектеулері',
            'compare.roleFallback': 'Құрал сипаттамасы мен құжаттамасын қараңыз',
            'compare.requirementsFallback': 'Таңдалған стек пен іске қосу тәсіліне байланысты',
            'compare.levelFallback': 'Қиындығы тәжірибеңіз бен жобаға байланысты',
            'compare.priceFallback': 'Шарттары мен лицензиясын ресми сайттан тексеріңіз',
            'compare.considerFallback': 'Таңдамас бұрын құжаттамасы мен үйлесімділігін тексеріңіз.',
            'compare.limit': 'Салыстыру үшін төрт құралдан артық таңдамаңыз.',
            'compare.note': 'Кестені көлденең айналдыруға болады. Шарттар мен лицензия өзгеруі мүмкін — ресми құжаттамадан тексеріңіз.',
            'catalog.favoriteRemove': '{name} таңдаулылардан алып тастау',
            'catalog.favoriteAdd': '{name} таңдаулыларға қосу', 'catalog.favoriteTitleRemove': 'Таңдаулылардан алып тастау',
            'catalog.favoriteTitleAdd': 'Таңдаулыларға сақтау', 'catalog.comparing': 'Салыстыруда',
            'catalog.compareAdd': 'Салыстыру', 'catalog.details': 'Толығырақ',
            'suggest.duplicate': '«{name}» құралы каталогта бар. Оны іздеу арқылы табыңыз.',
            'suggest.unavailable': 'Ұсыныстар қызметі қолжетімсіз. Supabase байланысын тексеріп, бетті жаңартыңыз.',
            'suggest.login': 'Ұсыныс жіберу үшін аккаунтқа кіріңіз.',
            'suggest.sent': 'Ұсыныс тексеруге жіберілді. Ол мақұлданғаннан кейін ғана каталогқа қосылады.',
            'suggest.tableMissing': 'Ұсыныстар кестесі жоқ. SQL Editor ішінде жаңартылған supabase-setup.sql файлын орындаңыз.',
            'suggest.failed': 'Ұсынысты жіберу мүмкін болмады. Байланыс пен дерекқор параметрлерін тексеріңіз.',
            'suggest.name': 'Атауы', 'suggest.category': 'Санат',
            'suggest.website': 'Ресми сайт немесе құжаттама', 'suggest.description': 'Оның пайдасы қандай?',
            'suggest.reason': 'Оны каталогқа неге қосу керек?', 'suggest.submit': 'Топқа жіберу',
            'suggest.reviewNote': 'Ұсыныс бірден каталогқа қосылмайды. Жіберу үшін аккаунтқа кіріңіз.',
            'suggest.namePlaceholder': 'Мысалы, Astro',
            'suggest.descriptionPlaceholder': 'Құрал қандай мәселені шешеді және кімге пайдалы?',
            'suggest.reasonPlaceholder': 'Мысалы, ол ... үшін ыңғайлы және ... толықтырады.',
            'suggest.catalogCheckFailed': 'Ортақ каталогты тексеру мүмкін болмады. Жібермес бұрын бетті жаңартыңыз.',
            'suggest.websiteInvalid': 'http:// немесе https:// деп басталатын сайт мекенжайын енгізіңіз.',
            'catalog.approvedLoadError': 'Қабылданған құралдарды жүктеу мүмкін болмады. Жаңартылған supabase-setup.sql файлын орындаңыз.',
            'adminSuggestions.title': 'Тексеруді күтетін ұсыныстар',
            'adminSuggestions.refresh': 'Жаңарту',
            'adminSuggestions.loading': 'Ұсыныстар жүктелуде…',
            'adminSuggestions.loadError': 'Ұсыныстарды жүктеу мүмкін болмады. Тізімді жаңартып көріңіз.',
            'adminSuggestions.pendingCount': 'Тексеруді күтуде: {count}',
            'adminSuggestions.empty': 'Әзірге жаңа ұсыныстар жоқ.',
            'adminSuggestions.category': 'Санат',
            'adminSuggestions.website': 'Сайт немесе құжаттама',
            'adminSuggestions.description': 'Сипаттама',
            'adminSuggestions.reason': 'Қосудың себебі',
            'adminSuggestions.pending': 'Тексерілуде',
            'adminSuggestions.approved': 'Қабылданды',
            'adminSuggestions.rejected': 'Қабылданбады',
            'adminSuggestions.rejectedMessage': 'Ұсыныс қабылданбады.',
            'adminSuggestions.alreadyPublished': 'Каталогта бар',
            'adminSuggestions.catalogUnavailable': 'Каталогты жүктеу мүмкін болмады: Supabase бапталғаннан кейін бетті жаңартыңыз.',
            'adminSuggestions.duplicate': 'Бұл құрал каталогта жарияланған.',
            'adminSuggestions.accept': 'Қабылдау және жариялау',
            'adminSuggestions.reject': 'Қабылдамау',
            'adminSuggestions.saving': 'Шешім сақталуда…',
            'adminSuggestions.accepted': 'Ұсыныс қабылданып, құрал каталогта жарияланды.',
            'adminSuggestions.acceptedCatalogRefreshFailed': 'Ұсыныс қабылданды, бірақ каталог жаңартылмады. Бетті қайта жүктеңіз.',
            'adminSuggestions.updateError': 'Шешімді сақтау мүмкін болмады. Supabase SQL баптауын жаңартып, қайталап көріңіз.',
            'tool.approvedEnvironment': 'Құралға байланысты',
            'tool.approvedSetup1': 'Ресми сайтты ашып, ағымдағы талаптарын тексеріңіз.',
            'tool.approvedSetup2': 'Жүйеңіз бен жобаңызға арналған ресми нұсқауларды орындаңыз.',
            'tool.approvedSetup3': 'Алдымен құралды шағын сынақ жобасында тексеріңіз.',
            'tool.approvedMethod1': 'Ресми құжаттама мен қолдау көрсетілетін нұсқадан бастаңыз.',
            'tool.approvedMethod2': 'Құралдың стекпен үйлесімділігін тексеріңіз.',
            'tool.approvedMethod3': 'Негізгі жобаға қоспас бұрын нәтижесін тексеріңіз.',
            'tool.approvedTip1': 'Ресми сайттан лицензиясы мен пайдалану шарттарын тексеріңіз.',
            'tool.approvedTip2': 'Құпиясөздер мен токендерді ашық кодқа қоспаңыз.',
            'tool.approvedTip3': 'Құралдың ресми жаңартуларын бақылаңыз.',
            'community.title': 'Қауымдастық қабырғасы',
            'community.description': 'Құралдардың жобаларыңызға қалай көмектесетінін көрсетіңіз.',
            'community.loading': 'Жарияланымдар жүктелуде…',
            'community.loadError': 'Қабырғаны жүктеу мүмкін болмады. Бетті жаңартып, қайталап көріңіз.',
            'community.unavailable': 'Қауымдастық қабырғасы қолжетімсіз: Supabase байланысын тексеріңіз.',
            'community.login': 'Өз оқиғаңызбен бөлісу үшін аккаунтқа кіріңіз.',
            'community.tool': 'Құрал',
            'community.project': 'Қазір қандай жобамен айналысып жатырсыз?',
            'community.usage': 'Құралды қалай қолданасыз?',
            'community.message': 'Пікіріңіз',
            'community.commentLabel': 'Пікір',
            'community.toolPlaceholder': 'Мысалы, React',
            'community.projectPlaceholder': 'Мысалы, портфолио сайты',
            'community.usagePlaceholder': 'Бұл құралмен нақты не істейсіз?',
            'community.messagePlaceholder': 'Тәжірибеңізбен не кеңесіңізбен бөлісіңіз',
            'community.photo': 'Жоба фотосы (міндетті емес, 5 МБ-қа дейін)',
            'community.publish': 'Стикер жариялау',
            'community.empty': 'Әзірге оқиғалар жоқ. Бірінші болып бөлісіңіз!',
            'community.member': 'Қауымдастық мүшесі',
            'community.delete': 'Стикерді жою',
            'community.deleteConfirm': 'Бұл жарияланымды жоясыз ба? Бұл әрекетті қайтару мүмкін емес.',
            'community.deleteSuccess': 'Жарияланым жойылды.',
            'community.deleteFailed': 'Жарияланымды жою мүмкін болмады.',
            'community.photoType': 'JPG, PNG немесе WebP форматындағы суретті таңдаңыз.',
            'community.photoSize': 'Сурет өлшемі 5 МБ-тан аспауы керек.',
            'community.publishFailed': 'Жариялау мүмкін болмады. Байланыс пен Supabase баптауларын тексеріңіз.',
            'community.publishSuccess': 'Стикер жарияланды.',
            'community.imageCleanupFailed': 'Жарияланым жойылды, бірақ суретті тазалау мүмкін болмады. Әкімшіге хабарлаңыз.',
            'community.photoAlt': '{tool} жобасының фотосы',
            'community.toolLabel': 'Құрал',
            'community.projectLabel': 'Жоба',
            'community.usageLabel': 'Қолдану тәсілі',
            'category.interface': 'Интерфейс', 'category.backend': 'Backend', 'category.build': 'Құрастыру',
            'category.language': 'Тіл', 'category.database': 'Дерекқор',
            'category.infrastructure': 'Инфрақұрылым', 'category.quality': 'Сапа',
            'category.workflow': 'Жұмыс барысы', 'category.other': 'Басқа',
            'tool.back': 'Каталогқа оралу', 'tool.loading': 'Құрал туралы ақпарат жүктелуде…',
            'tool.notFound': 'Құрал табылмады',
            'tool.notFoundDescription': 'Каталогқа оралып, тізімнен құралды таңдаңыз.',
            'tool.openCatalog': 'Каталогты ашу', 'tool.docs': 'Ресми құжаттама',
            'tool.install': 'Орнату', 'tool.copy': 'Көшіру', 'tool.setup': 'Қосу жолы',
            'tool.template': 'Пайдалы үлгі',
            'tool.templateDescription': 'Бастапқы үлгіні жоба құрылымына бейімдеңіз.',
            'tool.copyTemplate': 'Үлгіні көшіру', 'tool.exampleTitle': 'Қолдану мысалы: {title}',
            'tool.copyExample': 'Мысалды көшіру', 'tool.methods': 'Жұмыс тәсілдері',
            'tool.tips': 'Әзірлеушілерге кеңес', 'tool.learning': 'Нұсқаулықтар мен бейнелер',
            'tool.language': 'Тіл / орта', 'tool.playVideo': 'Бейнені қосу: {title}',
            'tool.playVideoLabel': 'Бейнені көру',
            'tool.officialTutorial': 'Ресми нұсқаулық: {name}',
            'tool.findVideo': '{name} бойынша бейне нұсқаулықтарды табу',
            'tool.openVideo': 'YouTube-та ашу',
            'tool.resourceNote': 'Жаңартылған сабақтарды таңдаңыз және пәрмендерді ресми құжаттамамен тексеріңіз.',
            'tool.copyUnavailable': 'Көшіру қолжетімсіз. Мәтінді белгілеп, қолмен көшіріңіз.',
            'tool.copySuccess': 'Мәтін көшірілді.',
            'tool.copyFailed': 'Көшіру мүмкін болмады. Мәтінді белгілеп, қолмен көшіріңіз.',
            'collection.first': 'Алғашқы веб-жоба',
            'collection.firstDescription': 'Бастауға қажетті интерфейс, сервер, деректер және жариялау.',
            'collection.workflow': 'Жұмыс барысы',
            'collection.workflowDescription': 'Құрастыру, сапаны тексеру және ортақ орта құралдары.'
        },
        en: {
            'nav.library': 'Library', 'nav.feed': 'Feed', 'nav.catalog': 'Catalog',
            'nav.collections': 'Collections', 'nav.favorites': 'Favorites', 'nav.compare': 'Compare',
            'nav.suggest': 'Suggest a tool', 'nav.settings': 'Settings', 'nav.profile': 'My profile',
            'nav.community': 'Community',
            'nav.logout': 'Sign out', 'nav.primary': 'Primary navigation',
            'nav.secondary': 'Secondary navigation', 'feed.tools': 'Tools',
            'auth.notConfigured': 'Authentication is not configured. Add the project URL and public Supabase key.',
            'auth.libraryUnavailable': 'Could not load the authentication library. Check your internet connection.',
            'auth.connecting': 'Connecting authentication. Wait a moment and try again.',
            'auth.sessionError': 'Could not verify your session. Refresh the page and try again.',
            'search.placeholder': 'Search tools',
            'search.label': 'Search tools',
            'catalog.filter': 'Filter by category', 'compare.picker': 'Tool to compare',
            'settings.title': 'Settings', 'settings.description': 'Choose a theme and interface language.',
            'settings.theme': 'Theme', 'settings.language': 'Interface language',
            'settings.save': 'Save', 'settings.reset': 'Reset',
            'settings.saved': 'Settings saved.', 'settings.resetDone': 'Settings reset.',
            'settings.saveError': 'Could not save settings. Check browser storage permissions.',
            'storage.readError': 'Could not read saved data. Default values are shown.',
            'storage.saveError': 'Could not save changes. Check browser storage permissions.',
            'theme.light': 'Light', 'theme.dark': 'Dark', 'theme.forest': 'Forest',
            'theme.lavender': 'Lavender', 'theme.terracotta': 'Terracotta', 'theme.system': 'Use system setting',
            'profile.title': 'My profile',
            'profile.summary': 'Add your experience and projects to make your profile more useful.',
            'profile.greeting': '{name}’s profile',
            'profile.library': 'Your library', 'profile.favorites': 'Favorites',
            'profile.local': 'On this device', 'profile.compare': 'In comparison',
            'profile.continue': 'Continue choosing', 'profile.personal': 'Personal details',
            'profile.firstName': 'First name', 'profile.lastName': 'Last name', 'profile.nickname': 'Username',
            'profile.email': 'Email', 'profile.birthday': 'Date of birth', 'profile.developer': 'About you',
            'profile.focus': 'Role', 'profile.focusSelect': 'Choose a role',
            'profile.experience': 'Experience', 'profile.experienceSelect': 'Choose a level',
            'profile.project': 'What are you working on?',
            'profile.projectPlaceholder': 'For example, a personal site or app API',
            'profile.security': 'Security',
            'profile.securityText': 'We will email a secure link to change your password.',
            'profile.changePassword': 'Change password', 'profile.save': 'Save changes',
            'profile.saveNote': 'Changes take effect after saving.',
            'profile.saved': 'Profile saved.',
            'profile.personalize': 'Personalize your profile for your work.',
            'profile.addFocus': 'Add a role to personalize your workspace.',
            'profile.saveError': 'Could not save changes. Please try again.',
            'profile.emailMissing': 'Could not read the account email. Please sign in again.',
            'profile.passwordSent': 'A password-change link was sent to your account email.',
            'profile.passwordError': 'Could not send the email. Please try again.',
            'profile.schemaError': 'The profile table is missing. Run supabase-setup.sql in the project SQL Editor.',
            'profile.columnsError': 'The profile table is outdated. Run supabase-setup.sql again in the project SQL Editor.',
            'profile.permissionError': 'Profile access was denied. Check the RLS policies from supabase-setup.sql.',
            'role.frontend': 'Frontend', 'role.backend': 'Backend', 'role.fullstack': 'Full-stack',
            'role.mobile': 'Mobile development', 'role.design': 'Design', 'role.other': 'Other',
            'experience.beginner': 'Just starting', 'experience.learning': 'Learning and practicing',
            'experience.working': 'Working in development', 'experience.advanced': 'Experienced professional',
            'feed.title': 'Tools feed',
            'feed.description': 'Discover tools, build your stack, and compare options.',
            'feed.starterBadge': 'Starter collection', 'feed.starterTitle': 'A stack for your first project',
            'feed.starterDescription': 'A clear path from interface to database and deployment.',
            'feed.starterButton': 'View the stack',
            'feed.catalog': 'Tool catalog', 'feed.collections': 'Collections',
            'feed.favorites': 'Favorites', 'feed.compare': 'Compare',
            'feed.suggest': 'Suggest a tool',
            'catalog.all': 'All', 'catalog.resetCollection': 'Collection: {name} ✕',
            'catalog.noResults': 'No results. Change your search or clear the filters.',
            'catalog.shown': 'Showing {shown} of {total}',
            'favorites.empty': 'Nothing saved yet. Select the bookmark on a card to save a tool.',
            'favorites.remove': 'Remove', 'favorites.open': 'Open',
            'compare.empty': 'Add tools to comparison with the button on a card.',
            'compare.selected': '{count} of 4 selected', 'compare.addLabel': 'Add to comparison',
            'compare.add': 'Add', 'compare.clear': 'Clear comparison',
            'compare.remove': 'Remove', 'compare.criteria': 'Criteria',
            'compare.removeNamed': 'Remove {name} from comparison',
            'compare.role': 'Role in the stack', 'compare.task': 'What it solves',
            'compare.requirements': 'What you need', 'compare.environment': 'Language / environment',
            'compare.level': 'What you need to learn', 'compare.cost': 'License and cost',
            'compare.good': 'A good choice if…', 'compare.consider': 'Trade-offs',
            'compare.roleFallback': 'Check the tool description and documentation',
            'compare.requirementsFallback': 'Depends on your stack and deployment approach',
            'compare.levelFallback': 'Effort depends on your experience and project',
            'compare.priceFallback': 'Check the terms and license on the official site',
            'compare.considerFallback': 'Check the documentation and compatibility before choosing.',
            'compare.limit': 'Choose no more than four tools to compare.',
            'compare.note': 'Scroll the table horizontally. Terms and licenses can change; check the official documentation.',
            'catalog.favoriteRemove': 'Remove {name} from favorites',
            'catalog.favoriteAdd': 'Add {name} to favorites', 'catalog.favoriteTitleRemove': 'Remove from favorites',
            'catalog.favoriteTitleAdd': 'Save to favorites', 'catalog.comparing': 'Comparing',
            'catalog.compareAdd': 'Compare', 'catalog.details': 'Details',
            'suggest.duplicate': '{name} is already in the catalog. Find it using search.',
            'suggest.unavailable': 'Suggestions are unavailable. Check your Supabase connection and reload the page.',
            'suggest.login': 'Sign in to submit a suggestion for review.',
            'suggest.sent': 'Suggestion sent for review. It will appear in the catalog only after approval.',
            'suggest.tableMissing': 'The suggestions table is missing. Run the updated supabase-setup.sql in the SQL Editor.',
            'suggest.failed': 'Could not send the suggestion. Check your connection and database settings.',
            'suggest.name': 'Name', 'suggest.category': 'Category',
            'suggest.website': 'Official website or documentation', 'suggest.description': 'What is it useful for?',
            'suggest.reason': 'Why should it be added to the catalog?', 'suggest.submit': 'Send to the team',
            'suggest.reviewNote': 'Suggestions are reviewed before appearing in the catalog. Sign in to submit one.',
            'suggest.namePlaceholder': 'For example, Astro',
            'suggest.descriptionPlaceholder': 'What problem does it solve, and who would benefit?',
            'suggest.reasonPlaceholder': 'For example, it is useful for ... and complements ...',
            'suggest.catalogCheckFailed': 'Could not check the shared catalog. Reload the page before submitting.',
            'suggest.websiteInvalid': 'Enter a website URL that starts with http:// or https://.',
            'catalog.approvedLoadError': 'Could not load approved tools. Run the updated supabase-setup.sql.',
            'adminSuggestions.title': 'Tool suggestions to review',
            'adminSuggestions.refresh': 'Refresh',
            'adminSuggestions.loading': 'Loading suggestions…',
            'adminSuggestions.loadError': 'Could not load suggestions. Try refreshing the list.',
            'adminSuggestions.pendingCount': 'Awaiting review: {count}',
            'adminSuggestions.empty': 'There are no new suggestions yet.',
            'adminSuggestions.category': 'Category',
            'adminSuggestions.website': 'Website or documentation',
            'adminSuggestions.description': 'Description',
            'adminSuggestions.reason': 'Why it should be added',
            'adminSuggestions.pending': 'Pending review',
            'adminSuggestions.approved': 'Approved',
            'adminSuggestions.rejected': 'Rejected',
            'adminSuggestions.rejectedMessage': 'Suggestion rejected.',
            'adminSuggestions.alreadyPublished': 'Already in catalog',
            'adminSuggestions.catalogUnavailable': 'Could not load the catalog. Reload after setting up Supabase.',
            'adminSuggestions.duplicate': 'This tool is already published in the catalog.',
            'adminSuggestions.accept': 'Accept and publish',
            'adminSuggestions.reject': 'Reject',
            'adminSuggestions.saving': 'Saving decision…',
            'adminSuggestions.accepted': 'Suggestion accepted and published in the catalog.',
            'adminSuggestions.acceptedCatalogRefreshFailed': 'Suggestion accepted, but the catalog did not refresh. Reload the page.',
            'adminSuggestions.updateError': 'Could not save the decision. Update the Supabase SQL setup and try again.',
            'tool.approvedEnvironment': 'Depends on the tool',
            'tool.approvedSetup1': 'Open the official website and check the current requirements.',
            'tool.approvedSetup2': 'Follow the official instructions for your system and project.',
            'tool.approvedSetup3': 'Try the tool in a small test project first.',
            'tool.approvedMethod1': 'Start with the official documentation and a supported version.',
            'tool.approvedMethod2': 'Check that the tool is compatible with your stack.',
            'tool.approvedMethod3': 'Verify the result before using it in your main project.',
            'tool.approvedTip1': 'Check the license and terms of use on the official website.',
            'tool.approvedTip2': 'Do not put passwords or tokens in public source code.',
            'tool.approvedTip3': 'Keep up with official tool updates.',
            'community.title': 'Community wall',
            'community.description': 'Show how tools help you build real projects.',
            'community.loading': 'Loading posts…',
            'community.loadError': 'Could not load the wall. Refresh the page and try again.',
            'community.unavailable': 'The community wall is unavailable. Check your Supabase connection.',
            'community.login': 'Sign in to share your story.',
            'community.tool': 'Tool',
            'community.project': 'What are you working on?',
            'community.usage': 'How do you use this tool?',
            'community.message': 'Your comment',
            'community.commentLabel': 'Comment',
            'community.toolPlaceholder': 'For example, React',
            'community.projectPlaceholder': 'For example, a portfolio site',
            'community.usagePlaceholder': 'What do you use this tool to build?',
            'community.messagePlaceholder': 'Share a tip or something you learned',
            'community.photo': 'Project photo (optional, up to 5 MB)',
            'community.publish': 'Post sticker',
            'community.empty': 'No stories yet. Share the first one!',
            'community.member': 'Community member',
            'community.delete': 'Delete sticker',
            'community.deleteConfirm': 'Delete this post? This action cannot be undone.',
            'community.deleteSuccess': 'Post deleted.',
            'community.deleteFailed': 'Could not delete the post.',
            'community.photoType': 'Choose a JPG, PNG, or WebP image.',
            'community.photoSize': 'The image must be no larger than 5 MB.',
            'community.publishFailed': 'Could not publish. Check the connection and Supabase setup.',
            'community.publishSuccess': 'Sticker posted.',
            'community.imageCleanupFailed': 'The post was deleted, but its image could not be removed. Contact an administrator.',
            'community.photoAlt': 'Project photo for {tool}',
            'community.toolLabel': 'Tool',
            'community.projectLabel': 'Project',
            'community.usageLabel': 'How I use it',
            'category.interface': 'Interface', 'category.backend': 'Backend', 'category.build': 'Build',
            'category.language': 'Language', 'category.database': 'Database',
            'category.infrastructure': 'Infrastructure', 'category.quality': 'Quality',
            'category.workflow': 'Workflow', 'category.other': 'Other',
            'tool.back': 'Back to catalog', 'tool.loading': 'Loading tool information…',
            'tool.notFound': 'Tool not found',
            'tool.notFoundDescription': 'Return to the catalog and choose a tool from the list.',
            'tool.openCatalog': 'Open catalog', 'tool.docs': 'Official documentation',
            'tool.install': 'Install', 'tool.copy': 'Copy', 'tool.setup': 'Getting started',
            'tool.template': 'Starter template',
            'tool.templateDescription': 'Adapt this starting point to your project structure.',
            'tool.copyTemplate': 'Copy template', 'tool.exampleTitle': 'Example: {title}',
            'tool.copyExample': 'Copy example', 'tool.methods': 'Methods and workflow',
            'tool.tips': 'Developer tips', 'tool.learning': 'Tutorials and videos',
            'tool.language': 'Language / environment', 'tool.playVideo': 'Play video: {title}',
            'tool.playVideoLabel': 'Watch video',
            'tool.officialTutorial': 'Official tutorial: {name}',
            'tool.findVideo': 'Find video tutorials for {name}',
            'tool.openVideo': 'Open video on YouTube',
            'tool.resourceNote': 'Choose up-to-date lessons and verify commands against the official documentation.',
            'tool.copyUnavailable': 'Copying is unavailable. Select and copy the text manually.',
            'tool.copySuccess': 'Text copied.',
            'tool.copyFailed': 'Could not copy. Select and copy the text manually.',
            'collection.first': 'First web project',
            'collection.firstDescription': 'Interface, server, data, and deployment — everything you need to start.',
            'collection.workflow': 'Team workflow',
            'collection.workflowDescription': 'Tools for building, quality checks, and shared environments.'
        }
    };
    let settings = { theme: defaults.theme, language: defaults.language };

    function translate(key, values) {
        const languageCopy = copy[settings.language] || copy.ru;
        let phrase = languageCopy[key] || copy.ru[key] || key;
        Object.keys(values || {}).forEach(function (name) {
            phrase = phrase.replace('{' + name + '}', values[name]);
        });
        return phrase;
    }

    function applyTranslations() {
        window.butleekLanguage = settings.language;
        document.documentElement.lang = settings.language === 'kk' ? 'kk' : settings.language;
        Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (node) {
            node.textContent = translate(node.getAttribute('data-i18n'));
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-placeholder]'), function (node) {
            node.setAttribute('placeholder', translate(node.getAttribute('data-i18n-placeholder')));
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria-label]'), function (node) {
            node.setAttribute('aria-label', translate(node.getAttribute('data-i18n-aria-label')));
        });
    }
    window.butleekTranslate = translate;
    const categoryKeys = {
        'Интерфейс': 'category.interface', Backend: 'category.backend', 'Сборка': 'category.build',
        'Язык': 'category.language', 'База данных': 'category.database',
        'Инфраструктура': 'category.infrastructure', 'Качество': 'category.quality',
        'Рабочий процесс': 'category.workflow', 'Другое': 'category.other'
    };
    window.butleekCategoryName = function (category) {
        const key = categoryKeys[category];
        return key ? translate(key) : category;
    };

    try {
        const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
        const legacyThemes = { 'Светлая': 'light', 'Тёмная': 'dark', 'Как в системе': 'system' };
        const theme = legacyThemes[saved.theme] || saved.theme;
        settings = {
            theme: ['light', 'dark', 'forest', 'lavender', 'terracotta', 'system'].indexOf(theme) !== -1 ? theme : defaults.theme,
            language: ['ru', 'kk', 'en'].indexOf(saved.language) !== -1 ? saved.language : defaults.language
        };
    } catch (error) {
        console.error('Не удалось прочитать настройки.', error);
    }

    function applySettings() {
        const dark = settings.theme === 'dark' ||
            (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.body.dataset.theme = settings.theme === 'system' ? (dark ? 'dark' : 'light') : settings.theme;
        applyTranslations();
    }

    applySettings();

    if (document.querySelector('.profile-content')) {
        try {
            const storedLibrary = localStorage.getItem('butleek:v1');
            const library = storedLibrary ? JSON.parse(storedLibrary) : {};
            const favorites = Array.isArray(library.favorites) ? library.favorites : ['react', 'postgresql'];
            const comparison = Array.isArray(library.compare) ? library.compare : ['react', 'fastapi', 'vite'];
            const favoriteCount = document.getElementById('profile-favorites-count');
            const compareCount = document.getElementById('profile-compare-count');
            if (favoriteCount) favoriteCount.textContent = String(favorites.length);
            if (compareCount) compareCount.textContent = String(comparison.length);
        } catch (error) {
            console.error('Не удалось загрузить сводку библиотеки.', error);
        }
    }

    if (search && !document.getElementById('tool-list')) {
        search.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter') return;
            const query = search.value.trim();
            window.location.href = 'main.html' + (query ? '?q=' + encodeURIComponent(query) : '') + '#catalog';
        });
    }

    if (!form) return;
    const theme = form.elements.theme;
    const language = form.elements.language;
    if (theme) theme.value = settings.theme;
    if (language) language.value = settings.language;

    form.addEventListener('change', function (event) {
        if (event.target.name === 'theme') {
            settings.theme = event.target.value;
            applySettings();
        }
        if (event.target.name === 'language') {
            settings.language = event.target.value;
            applySettings();
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (theme) settings.theme = theme.value;
        if (language) settings.language = language.value;
        try {
            localStorage.setItem(KEY, JSON.stringify(settings));
            applySettings();
            const message = document.getElementById('settings-message');
            if (message) {
                message.textContent = translate('settings.saved');
                message.className = 'form-message is-ok';
            }
        } catch (error) {
            console.error('Не удалось сохранить настройки.', error);
            const errorMessage = document.getElementById('settings-message');
            if (errorMessage) {
                errorMessage.textContent = translate('settings.saveError');
                errorMessage.className = 'form-message is-error';
            }
        }
    });

    const resetButton = document.getElementById('reset-settings');
    if (resetButton) resetButton.addEventListener('click', function () {
        settings = { theme: defaults.theme, language: defaults.language };
        if (theme) theme.value = settings.theme;
        if (language) language.value = settings.language;
        applySettings();
        try {
            localStorage.setItem(KEY, JSON.stringify(settings));
            const message = document.getElementById('settings-message');
            if (message) {
                message.textContent = translate('settings.resetDone');
                message.className = 'form-message is-ok';
            }
        } catch (error) {
            console.error('Не удалось сбросить настройки.', error);
            const errorMessage = document.getElementById('settings-message');
            if (errorMessage) {
                errorMessage.textContent = translate('settings.saveError');
                errorMessage.className = 'form-message is-error';
            }
        }
    });
})();
