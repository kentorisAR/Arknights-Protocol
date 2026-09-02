/* =========================================================
   PRTS NETWORK & ARCHIVE SYSTEM (prts-console.js)
   ========================================================= */

// 1. БАЗА ДАННЫХ РЕГИОНОВ И ОПЕРАТИВНИКОВ
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
    operators: [
      {
        id: "hellagur",
        name: "Hellagur",
        role: "Guard / Ex-General",
        status: "Active (Azazel Clinic)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_188_helagr.png",
        dossier: "Ветеран войн Урсуса и бывший генеральный офицер. Настоящий пограничник и защитник клиники Азазель для инфицированных."
      },
      {
        id: "rosa",
        name: "Rosa (Natalya)",
        role: "Sniper / USSG Leader",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_197_disaster.png",
        dossier: "Бывшая аристократка из Чернобога, лидер Студенческой группы самопомощи Урсуса."
      },
      {
        id: "zima",
        name: "Zima (Sonya)",
        role: "Vanguard / USSG",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_115_a2.png",
        dossier: "Закаленный в боях боец школьной группы. Известна вспыльчивым характером и владением топором."
      },
      {
        id: "gummy",
        name: "Gummy (Lada)",
        role: "Defender / Cook",
        status: "Active (Rhodes Island)",
        avatar: "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/char_196_sunr.png",
        dossier: "Отвечает за снабжение и готовку в отряде. Пережила тяжелые события в Чернобоге."
      }
    ]
  }
};

let currentRegion = null;

// 2. ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА ВНУТРИ ОКНА
function initPRTSConsole() {
  const terminalWin = document.querySelector('#terminal-win .window-body');
  if (!terminalWin) return;

  // Внедряем HTML-разметку системы прямо в окно консоли
  terminalWin.innerHTML = `
    <div id="prts-console-wrapper" style="height: 100%; display: flex; flex-direction: column; font-family: monospace;">
      
      <!-- 1. СЕТКА РЕГИОНОВ -->
      <div id="prts-view-regions">
        <div style="color: #00f0ff; margin-bottom: 15px; font-weight: bold;">[ ВЫБЕРИТЕ РЕГИОН / ДЕРЖАВУ ]</div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <div class="prts-hex-card" onclick="prtsOpenRegion('ursus')">
            <div style="font-size: 2rem;">🐻</div>
            <div style="color: #00f0ff; font-weight: bold; margin-top: 5px;">URSUS</div>
          </div>
        </div>
      </div>

      <!-- 2. МЕНЮ РЕГИОНА -->
      <div id="prts-view-detail" class="hidden">
        <button class="prts-btn-back" onclick="prtsShowView('prts-view-regions')">← НАЗАД К РЕГИОНАМ</button>
        <h3 id="prts-region-title" style="color: #00f0ff; margin: 10px 0;"></h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
          <button class="prts-nav-btn" onclick="prtsShowSection('politics_internal')">🏛️ Внутренняя политика</button>
          <button class="prts-nav-btn" onclick="prtsShowSection('politics_external')">🌐 Внешняя политика</button>
          <button class="prts-nav-btn" onclick="prtsShowSection('government')">👑 Власть и Правительство</button>
          <button class="prts-nav-btn" onclick="prtsShowTree()">👥 Оперативники и Персонажи</button>
        </div>

        <div id="prts-info-box" style="background: rgba(0, 10, 20, 0.8); border: 1px solid rgba(0,240,255,0.3); padding: 10px; font-size: 0.8rem; color: #d8ecf8; min-height: 80px; border-radius: 4px;">
          Выберите раздел выше для загрузки данных из архива PRTS...
        </div>
      </div>

      <!-- 3. ДРЕВО ОПЕРАТИВНИКОВ -->
      <div id="prts-view-tree" class="hidden" style="position: relative; flex-grow: 1;">
        <button class="prts-btn-back" onclick="prtsShowView('prts-view-detail')">← НАЗАД В МЕНЮ РЕГИОНА</button>
        <div id="prts-tree-container" style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;"></div>

        <!-- ДОСЬЕ -->
        <div id="prts-dossier" class="hidden" style="position: absolute; right: 0; top: 0; bottom: 0; width: 240px; background: rgba(5,15,25,0.98); border: 1px solid #00f0ff; padding: 12px; border-radius: 6px; display: flex; flex-direction: column; gap: 8px; box-shadow: -5px 0 15px rgba(0,0,0,0.8); z-index: 10;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <img id="prts-d-img" src="" style="width: 50px; height: 50px; border: 1px solid #00f0ff; border-radius: 4px;">
            <div>
              <div id="prts-d-name" style="color: #00f0ff; font-weight: bold; font-size: 0.85rem;"></div>
              <div id="prts-d-role" style="color: #a0c0d0; font-size: 0.7rem;"></div>
            </div>
          </div>
          <div id="prts-d-status" style="font-size: 0.65rem; color: #00f0ff;"></div>
          <div id="prts-d-text" style="font-size: 0.7rem; color: #d8ecf8; line-height: 1.3;"></div>
          <button class="prts-btn-back" style="margin-top: auto; width: 100%; text-align: center;" onclick="prtsCloseDossier()">Закрыть</button>
        </div>
      </div>

    </div>
  `;

  // Добавляем необходимые CSS стили для элементов консоли
  injectPRTSStyles();
}

function injectPRTSStyles() {
  if (document.getElementById('prts-console-styles')) return;
  const style = document.createElement('style');
  style.id = 'prts-console-styles';
  style.innerHTML = `
    .prts-hex-card {
      width: 110px; height: 100px;
      background: rgba(0, 240, 255, 0.08);
      border: 1px solid rgba(0, 240, 255, 0.4);
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s;
    }
    .prts-hex-card:hover { background: rgba(0, 240, 255, 0.3); transform: scale(1.05); }
    
    .prts-btn-back {
      background: rgba(0, 240, 255, 0.1); border: 1px solid #00f0ff;
      color: #00f0ff; padding: 4px 8px; font-family: monospace; font-size: 0.75rem;
      cursor: pointer; display: inline-block; transition: all 0.2s;
    }
    .prts-btn-back:hover { background: #00f0ff; color: #000; }

    .prts-nav-btn {
      background: rgba(0, 30, 50, 0.8); border: 1px solid rgba(0, 240, 255, 0.4);
      color: #00f0ff; padding: 8px; font-family: monospace; font-size: 0.75rem;
      text-align: left; cursor: pointer; transition: all 0.2s;
    }
    .prts-nav-btn:hover { background: rgba(0, 240, 255, 0.2); border-color: #00f0ff; }

    .prts-op-node {
      width: 65px; height: 80px; background: rgba(0, 20, 35, 0.9);
      border: 1px solid #00f0ff; border-radius: 4px; padding: 4px;
      display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.2s;
    }
    .prts-op-node:hover { transform: scale(1.1); border-color: #fff; box-shadow: 0 0 10px #00f0ff; }
  `;
  document.head.appendChild(style);
}

// 3. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ И ВЫВОДА
function prtsShowView(viewId) {
  document.getElementById('prts-view-regions').classList.add('hidden');
  document.getElementById('prts-view-detail').classList.add('hidden');
  document.getElementById('prts-view-tree').classList.add('hidden');
  document.getElementById(viewId).classList.remove('hidden');
}

function prtsOpenRegion(regionId) {
  currentRegion = terraData[regionId];
  if (!currentRegion) return;
  document.getElementById('prts-region-title').innerText = currentRegion.name + " [" + currentRegion.code + "]";
  document.getElementById('prts-info-box').innerText = "Выберите раздел выше для загрузки данных из архива PRTS...";
  prtsShowView('prts-view-detail');
}

function prtsShowSection(sectionKey) {
  if (!currentRegion) return;
  document.getElementById('prts-info-box').innerText = currentRegion.sections[sectionKey] || "Данные отсутствуют.";
}

function prtsShowTree() {
  if (!currentRegion) return;
  const container = document.getElementById('prts-tree-container');
  container.innerHTML = '';

  currentRegion.operators.forEach(op => {
    const node = document.createElement('div');
    node.className = 'prts-op-node';
    node.onclick = () => prtsOpenDossier(op);
    node.innerHTML = `
      <img src="${op.avatar}" style="width: 45px; height: 45px; border-radius: 3px; object-fit: cover;">
      <div style="font-size: 0.6rem; color: #00f0ff; margin-top: 3px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">${op.name}</div>
    `;
    container.appendChild(node);
  });

  prtsShowView('prts-view-tree');
}

function prtsOpenDossier(op) {
  document.getElementById('prts-d-img').src = op.avatar;
  document.getElementById('prts-d-name').innerText = op.name;
  document.getElementById('prts-d-role').innerText = op.role;
  document.getElementById('prts-d-status').innerText = "Статус: " + op.status;
  document.getElementById('prts-d-text').innerText = op.dossier;
  document.getElementById('prts-dossier').classList.remove('hidden');
}

function prtsCloseDossier() {
  document.getElementById('prts-dossier').classList.add('hidden');
}

// Запускаем автоматическую сборку после загрузки страницы
document.addEventListener('DOMContentLoaded', initPRTSConsole);
