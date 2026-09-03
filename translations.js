/* =========================================================
   ЕДИНАЯ СИСТЕМА ЛОКАЛИЗАЦИИ (translations.js)
   ========================================================= */

const i18n = {
  ru: {
    // Авторизация
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

    terminalTitle: "💻 PRTS Console",

     // Добавьте эти ключи внутрь объекта i18n в translations.js:

   /* RU */
   sector_label: "СЕКТОР: ",
   sector_composition: "Состав:",

   command_title: "УПРАВЛЕНИЕ",
   command_desc: "Главный командный мостик судна. Координация операций и принятие стратегических решений.",
   command_members: "• Doctor (Стратег)\n• Amiya (Лидер)\n• PRTS (ИИ)",

   medical_title: "МЕДИЦИНА",
   medical_desc: "Медицинский отдел и исследовательская лаборатория. Лечение Орипатии и разработка препаратов.",
   medical_members: "• Kal'tsit (Глава отделения)\n• Gavial (Врач)\n• Shining (Врач)",

   engineering_title: "ИНЖЕНЕРИЯ",
   engineering_desc: "Обслуживание двигательной системы наземного судна и разработка экипировки.",
   engineering_members: "• Closure (Гл. Инженер)\n• Vulcan (Кузнец)",


   /* EN */
   sector_label: "SECTOR: ",
   sector_composition: "Personnel:",

   command_title: "COMMAND",
   command_desc: "Main command bridge. Operation coordination and strategic decision-making.",
   command_members: "• Doctor (Strategist)\n• Amiya (Leader)\n• PRTS (AI)",

   medical_title: "MEDICAL",
   medical_desc: "Medical department and research lab. Oripathy treatment and drug development.",
   medical_members: "• Kal'tsit (Head of Dept.)\n• Gavial (Medic)\n• Shining (Medic)",

   engineering_title: "ENGINEERING",
   engineering_desc: "Landship propulsion system maintenance and equipment engineering.",
   engineering_members: "• Closure (Chief Engineer)\n• Vulcan (Blacksmith)",


   /* JP */
   sector_label: "セクター: ",
   sector_composition: "構成員:",

   command_title: "指揮部",
   command_desc: "艦艇のメインブリッジ。作戦の統 me и 戦略的意思決定を行う。",
   command_members: "• Doctor (戦略官)\n• Amiya (リーダー)\n• PRTS (AI)",

   medical_title: "医療部",
   medical_desc: "医療部門および研究ラボ。鉱石病（オリパシー）の治療と薬剤開発。",
   medical_members: "• Kal'tsit (医療部門統括)\n• Gavial (医師)\n• Shining (医師)",

   engineering_title: "エンジニア部",
   engineering_desc: "移動都市の動力システム保守および dynamic 装備の開発。",
   engineering_members: "• Closure (チーフエンジニア)\n• Vulcan (鍛冶屋)"
   

    // Консоль PRTS (Терминал)
    select_region: "[ ВЫБЕРИТЕ РЕГИОН / ГОСУДАРСТВО ]",
    btn_back_regions: "← НАЗАД К РЕГИОНАМ",
    btn_back_detail: "← НАЗАД В МЕНЮ РЕГИОНА",
    btn_internal_pol: "🏛️ Внутренняя политика",
    btn_external_pol: "🌐 Внешняя политика",
    btn_gov: "👑 Власть и Правительство",
    btn_ops: "👥 Оперативники и Персонажи",
    info_placeholder: "Выберите раздел выше для загрузки данных из архива PRTS...",
    close_dossier: "Закрыть",
    status: "Статус: ",

    // Регион: Урсус
    ursus_card: "УРСУС",
    ursus_name: "Империя Урсус",
    ursus_pol_int: "Абсолютная монархия со сложной внутренней борьбой между военной аристократией и императорской властью. Инфицированные граждане лишены прав.",
    ursus_pol_ext: "Экспансионистская внешняя политика. Поддерживает напряженные отношения с соседними государствами (Янь, Казимеж).",
    ursus_gov: "Император Фёдор и совет военных генералов (Военная фракция / Старая гвардия)."
  },

  en: {
    // Authorization
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

    terminalTitle: "💻 PRTS Console",

    // PRTS Console (Terminal)
    select_region: "[ SELECT REGION / STATE ]",
    btn_back_regions: "← BACK TO REGIONS",
    btn_back_detail: "← BACK TO REGION MENU",
    btn_internal_pol: "🏛️ Internal Politics",
    btn_external_pol: "🌐 External Politics",
    btn_gov: "👑 Government & Power",
    btn_ops: "👥 Operatives & Characters",
    info_placeholder: "Select a section above to load data from PRTS archives...",
    close_dossier: "Close",
    status: "Status: ",

    // Region: Ursus
    ursus_card: "URSUS",
    ursus_name: "Ursus Empire",
    ursus_pol_int: "Absolute monarchy with intense internal strife between the military aristocracy and imperial authority. Infected citizens lack basic rights.",
    ursus_pol_ext: "Expansionist foreign policy. Maintains tense relations with neighboring states (Yan, Kazimierz).",
    ursus_gov: "Emperor Fyodor and the Council of Military Generals (Military Faction / Old Guard)."
  },

  jp: {
    // 認証
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

    terminalTitle: "💻 PRTS コンソール",

    // PRTS コンソール (端末)
    select_region: "[ 地域・国家を選択 ]",
    btn_back_regions: "← 地域一覧に戻る",
    btn_back_detail: "← 地域メニューに戻る",
    btn_internal_pol: "🏛️ 内政方針",
    btn_external_pol: "🌐 外交政策",
    btn_gov: "👑 政府・権力構造",
    btn_ops: "👥 オペレーター・人物録",
    info_placeholder: "上のセクションを選択してPRTSアーカイブからデータを読み込みます...",
    close_dossier: "閉じる",
    status: "ステータス: ",

    // 地域: ウルサス
    ursus_card: "ウルサス",
    ursus_name: "ウルサス帝国",
    ursus_pol_int: "軍事貴族と皇権の政治闘争が続く絶対君主制。感染者は基本的人権を剥奪されている。",
    ursus_pol_ext: "拡張主義的な外交政策。隣国（炎国、カジミエーシュ）とは緊張関係にある。",
    ursus_gov: "皇帝フョードルと軍部将軍会議（軍事派閥 / 守旧派）。"
  }
};

let currentLang = localStorage.getItem('prts_lang') || 'ru';

// Функция получения перевода по ключу с обработкой запасных вариантов
function getTranslation(key) {
  if (i18n[currentLang] && i18n[currentLang][key]) {
    return i18n[currentLang][key];
  }
  if (i18n['ru'] && i18n['ru'][key]) {
    return i18n['ru'][key];
  }
  return key;
}

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

  // Подсвечиваем активную кнопку языка
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // 🔔 Отправляем системное событие, чтобы консоль PRTS перевелась прямо на лету!
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}

// Автоматическое применение при загрузке
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
