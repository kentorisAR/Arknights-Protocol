const i18n = {
  ru: {
    loginTitle: "PRTS ARCHIVE ACCESS",
    loginPlaceholder: "Логин",
    passwordPlaceholder: "Пароль",
    loginBtn: "ВХОД В СИСТЕМУ",
    hintTyping: "[ Нажимайте любые клавиши для ввода ]",
    hintClick: "[ Нажмите кнопку ВХОД В СИСТЕМУ ]",
    
    // Рабочий стол
    iconArchive: "Архив Данных",
    iconOperators: "Операторы",
    iconTerminal: "Терминал PRTS",
    
    // Меню Пуск и Поиск
    startTitle: "PRTS SYSTEM MENU",
    startArchive: "📂 Открыть Архив",
    startOperators: "👥 Открыть Операторов",
    startTerminal: "💻 Запустить Консоль",
    startExit: "🚪 Выход из системы",
    searchPlaceholder: "Поиск файлов...",

    // Окна
    archiveTitle: "📂 Архив Родоса",
    archiveHeader: "Записи базы данных:",
    archiveItem1: "Проект PRTS: Статус [Активен]",
    archiveItem2: "Отчет по минералу Ориджиниуму",
    archiveItem3: "Засекреченные материалы Доктора",

    operatorsTitle: "👥 Ростер Операторов",
    opAmiya: "Лидер Rhodes Island (Caster)",
    opKaltsit: "Глава Медицинского Отдела (Medic)",
    opDoctor: "Главный Стратег",

    terminalTitle: "💻 PRTS Console"
  },

  en: {
    loginTitle: "PRTS ARCHIVE ACCESS",
    loginPlaceholder: "Username",
    passwordPlaceholder: "Password",
    loginBtn: "SYSTEM LOGIN",
    hintTyping: "[ Press any keys to type ]",
    hintClick: "[ Press SYSTEM LOGIN button ]",
    
    // Desktop
    iconArchive: "Data Archive",
    iconOperators: "Operators",
    iconTerminal: "PRTS Terminal",
    
    // Start Menu & Search
    startTitle: "PRTS SYSTEM MENU",
    startArchive: "📂 Open Archive",
    startOperators: "👥 Open Operators",
    startTerminal: "💻 Launch Console",
    startExit: "🚪 System Exit",
    searchPlaceholder: "Search files...",

    // Windows
    archiveTitle: "📂 Rhodes Archive",
    archiveHeader: "Database records:",
    archiveItem1: "PRTS Project: Status [Active]",
    archiveItem2: "Originium Mineral Report",
    archiveItem3: "Classified Doctor Files",

    operatorsTitle: "👥 Operator Roster",
    opAmiya: "Leader of Rhodes Island (Caster)",
    opKaltsit: "Head of Medical Dept. (Medic)",
    opDoctor: "Chief Strategist",

    terminalTitle: "💻 PRTS Console"
  },

  jp: {
    loginTitle: "PRTS アーカイブアクセス",
    loginPlaceholder: "ユーザー名",
    passwordPlaceholder: "パスワード",
    loginBtn: "システムログイン",
    hintTyping: "[ 任意のキーを押して入力 ]",
    hintClick: "[ ログインボタンを押してください ]",
    
    // デスクトップ
    iconArchive: "データアーカイブ",
    iconOperators: "オペレーター",
    iconTerminal: "PRTS 端末",
    
    // スタートメニュー & 検索
    startTitle: "PRTS システムメニュー",
    startArchive: "📂 アーカイブを開く",
    startOperators: "👥 オペレーターを開く",
    startTerminal: "💻 コンソールを起動",
    startExit: "🚪 システム終了",
    searchPlaceholder: "ファイルを検索...",

    // ウィンドウ
    archiveTitle: "📂 ロードス アーカイブ",
    archiveHeader: "データベース記録:",
    archiveItem1: "PRTS プロジェクト: ステータス [アクティブ]",
    archiveItem2: "オリジニウム鉱石レポート",
    archiveItem3: "ドクター機密ファイル",

    operatorsTitle: "👥 オペレーター名簿",
    opAmiya: "ロードス・アイランドリーダー (Caster)",
    opKaltsit: "医療部門統括 (Medic)",
    opDoctor: "最高戦略官",

    terminalTitle: "💻 PRTS コンソール"
  }
};

let currentLang = localStorage.getItem('prts_lang') || 'ru';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('prts_lang', lang);

  // Перевод обычных текстов
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // Перевод placeholder'ов в полях ввода
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[lang] && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });

  // Подсвечиваем активный язык в переключателе
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// Автоматическое применение при загрузке
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
