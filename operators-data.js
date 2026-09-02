/* =========================================================
   PRTS REGIONS & OPERATORS DATABASE
   ========================================================= */

const terraData = {
  ursus: {
    id: "ursus",
    name: "Ursus Empire",
    code: "US-002",
    logo: "🐻",
    sections: {
      politics_internal: "Абсолютная монархия со сложной внутренней борьбой между военной аристократией и императорской властью. Инфицированные граждане лишены прав и используются на принудительных работах.",
      politics_external: "Экспансионистская внешняя политика. Урсус поддерживает напряженные отношения с соседними державами (Янь, Казимеж) и опирается на военную силу.",
      government: "Император Фёдор и совет военных генералов (Военная фракция / Старая гвардия).",
      factions: ["Ursus Student Self-Reliance Group", "Chernobog Patrol", "Reunion (Зародилось в Урсусе)"]
    },
    // Древо операторов и ключевых фигур
    operators: [
      {
        id: "rosa",
        name: "Rosa (Natalya Rostova)",
        role: "Sniper / USSG Leader",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_197_disaster.png",
        dossier: "Бывшая аристократка из Чернобога, лидер Студенческой группы самопомощи Урсуса. В бою использует тяжелый гарпунный метатель.",
        connectsTo: ["zima", "gummy"]
      },
      {
        id: "zima",
        name: "Zima (Sonya)",
        role: "Vanguard / USSG Combatant",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_115_a2.png",
        dossier: "Закаленный в боях лидер школьной группы. Известна своим вспыльчивым характером и владением топором.",
        connectsTo: []
      },
      {
        id: "gummy",
        name: "Gummy (Lada)",
        role: "Defender / USSG Cook",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_196_sunr.png",
        dossier: "Отвечает за снабжение и готовку в отряде. Несмотря на жизнерадостный вид, пережила серьезную психологическую травму в Чернобоге.",
        connectsTo: []
      },
      {
        id: "hellagur",
        name: "Hellagur",
        role: "Guard / Ex-General",
        status: "Active (Azazel Clinic)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_188_helagr.png",
        dossier: "Ветеран войн Урсуса и бывший генеральный офицер. Настоящий пограничник и защитник клиники Азазель для инфицированных.",
        connectsTo: []
      }
    ]
  }
};
