/* =========================================================
   PRTS NETWORK & ARCHIVE SYSTEM (prts-console.js)
   ========================================================= */

let currentRegionId = null;
let currentActiveSection = null;

// Получение перевода из глобального i18n
function getPRTSText(key) {
  const lang = window.currentLang || localStorage.getItem('prts_lang') || 'ru';
  if (typeof i18n !== 'undefined' && i18n[lang] && i18n[lang][key]) {
    return i18n[lang][key];
  }
  if (typeof i18n !== 'undefined' && i18n['ru'] && i18n['ru'][key]) {
    return i18n['ru'][key];
  }
  return key;
}

// Данные регионов и оперативников
function getTerraData() {
  return {
    ursus: {
      id: "ursus",
      cardName: getPRTSText('ursus_card'),
      name: getPRTSText('ursus_name'),
      code: "US-002",
      logo: "regions/Ursus/Ursus.webp",
      sections: {
        politics_internal: getPRTSText('ursus_pol_int'),
        politics_external: getPRTSText('ursus_pol_ext'),
        government: getPRTSText('ursus_gov')
      },
      operators: [
        {
          id: "hellagur",
          name: "Hellagur",
          role: "Guard / Ex-General",
          status: "Active (Azazel Clinic)",
          avatar: "regions/Ursus/operatives/hellagur.png",
          dossier: "Ветеран войн Урсуса и бывший генеральный офицер. Защитник клиники Азазель."
        },
        {
          id: "rosa",
          name: "Rosa (Natalya)",
          role: "Sniper / USSG Leader",
          status: "Active (Rhodes Island)",
          avatar: "regions/Ursus/operatives/rosa.png",
          dossier: "Бывшая аристократка из Чернобога, лидер Студенческой группы самопомощи Урсуса."
        },
        {
          id: "zima",
          name: "Zima (Sonya)",
          role: "Vanguard / USSG",
          status: "Active (Rhodes Island)",
          avatar: "regions/Ursus/operatives/zima.png",
          dossier: "Закаленный боец школьной группы Урсуса."
        },
        {
          id: "gummy",
          name: "Gummy (Lada)",
          role: "Defender / Cook",
          status: "Active (Rhodes Island)",
          avatar: "regions/Ursus/operatives/gummy.png",
          dossier: "Отвечает за снабжение и готовку в отряде."
        }
      ]
    }
  };
}

// Поиск контейнера терминала в HTML
function getTerminalContainer() {
  return document.querySelector('#terminal-win .window-body') || 
         document.querySelector('#terminalWindow .window-body') ||
         document.querySelector('#prts-window .window-body') ||
         document.querySelector('[data-window="terminal"] .window-body') ||
         document.querySelector('#terminal-win') ||
         document.querySelector('#terminalWindow');
}

// Инициализация графического интерфейса
function initPRTSConsole() {
  const terminalWin = getTerminalContainer();
  if (!terminalWin) return;

  // Вставляем макет консоли
  terminalWin.innerHTML = `
    <div id="prts-console-wrapper" style="height: 100%; display: flex; flex-direction: column; font-family: monospace; padding: 10px; box-sizing: border-box; overflow-y: auto;">
      
      <!-- 1. СЕТКА РЕГИОНОВ -->
      <div id="prts-view-regions">
        <div id="prts-title-select" style="color: #00f0ff; margin-bottom: 15px; font-weight: bold;">${getPRTSText('select_region')}</div>
        <div id="prts-regions-grid" style="display: flex; gap: 15px; flex-wrap: wrap;"></div>
      </div>

      <!-- 2. МЕНЮ РЕГИОНА -->
      <div id="prts-view-detail" class="hidden">
        <button class="prts-btn-back" id="prts-btn-back-reg" onclick="prtsShowView('prts-view-regions')">${getPRTSText('btn_back_regions')}</button>
        
        <div style="display: flex; align-items: center; gap: 12px; margin: 10px 0;">
          <img id="prts-region-logo" src="" style="width: 35px; height: 35px; object-fit: contain;" onerror="this.style.display='none'">
          <h3 id="prts-region-title" style="color: #00f0ff; margin: 0;"></h3>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
          <button class="prts-nav-btn" id="prts-btn-pol-int" onclick="prtsShowSection('politics_internal')">${getPRTSText('btn_internal_pol')}</button>
          <button class="prts-nav-btn" id="prts-btn-pol-ext" onclick="prtsShowSection('politics_external')">${getPRTSText('btn_external_pol')}</button>
          <button class="prts-nav-btn" id="prts-btn-gov" onclick="prtsShowSection('government')">${getPRTSText('btn_gov')}</button>
          <button class="prts-nav-btn" id="prts-btn-ops" onclick="prtsShowTree()">${getPRTSText('btn_ops')}</button>
        </div>

        <div id="prts-info-box" style="background: rgba(0, 10, 20, 0.8); border: 1px solid rgba(0,240,255,0.3); padding: 10px; font-size: 0.8rem; color: #d8ecf8; min-height: 80px; border-radius: 4px;">
          ${getPRTSText('info_placeholder')}
        </div>
      </div>

      <!-- 3. ДРЕВО ОПЕРАТИВНИКОВ -->
      <div id="prts-view-tree" class="hidden" style="position: relative; flex-grow: 1;">
        <button class="prts-btn-back" id="prts-btn-back-det" onclick="prtsShowView('prts-view-detail')">${getPRTSText('btn_back_detail')}</button>
        <div id="prts-tree-container" style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;"></div>

        <!-- ДОСЬЕ -->
        <div id="prts-dossier" class="hidden" style="position: absolute; right: 0; top: 0; bottom: 0; width: 240px; background: rgba(5,15,25,0.98); border: 1px solid #00f0ff; padding: 12px; border-radius: 6px; display: flex; flex-direction: column; gap: 8px; box-shadow: -5px 0 15px rgba(0,0,0,0.8); z-index: 10;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <img id="prts-d-img" src="" style="width: 50px; height: 50px; border: 1px solid #00f0ff; border-radius: 4px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/50?text=OP'">
            <div>
              <div id="prts-d-name" style="color: #00f0ff; font-weight: bold; font-size: 0.85rem;"></div>
              <div id="prts-d-role" style="color: #a0c0d0; font-size: 0.7rem;"></div>
            </div>
          </div>
          <div id="prts-d-status" style="font-size: 0.65rem; color: #00f0ff;"></div>
          <div id="prts-d-text" style="font-size: 0.7rem; color: #d8ecf8; line-height: 1.3;"></div>
          <button class="prts-btn-back" id="prts-btn-close-dos" style="margin-top: auto; width: 100%; text-align: center;" onclick="prtsCloseDossier()">${getPRTSText('close_dossier')}</button>
        </div>
      </div>

    </div>
  `;

  injectPRTSStyles();
  renderRegionsGrid();
}

function injectPRTSStyles() {
  if (document.getElementById('prts-console-styles')) return;
  const style = document.createElement('style');
  style.id = 'prts-console-styles';
  style.innerHTML = `
    .hidden { display: none !important; }
    .prts-hex-card {
      width: 110px; height: 100px;
      background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.4);
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

function renderRegionsGrid() {
  const grid = document.getElementById('prts-regions-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const data = getTerraData();

  Object.keys(data).forEach(key => {
    const reg = data[key];
    const card = document.createElement('div');
    card.className = 'prts-hex-card';
    card.onclick = () => prtsOpenRegion(reg.id);
    card.innerHTML = `
      <img src="${reg.logo}" alt="${reg.name}" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'">
      <div style="color: #00f0ff; font-weight: bold; margin-top: 4px; font-size: 0.75rem;">${reg.cardName}</div>
    `;
    grid.appendChild(card);
  });
}

function prtsShowView(viewId) {
  const regView = document.getElementById('prts-view-regions');
  const detView = document.getElementById('prts-view-detail');
  const treeView = document.getElementById('prts-view-tree');
  
  if (regView) regView.classList.add('hidden');
  if (detView) detView.classList.add('hidden');
  if (treeView) treeView.classList.add('hidden');
  
  const target = document.getElementById(viewId);
  if (target) target.classList.remove('hidden');
}

function prtsOpenRegion(regionId) {
  currentRegionId = regionId;
  currentActiveSection = null;
  updateRegionViewData();
  prtsShowView('prts-view-detail');
}

function updateRegionViewData() {
  if (!currentRegionId) return;
  const reg = getTerraData()[currentRegionId];
  if (!reg) return;

  const logoEl = document.getElementById('prts-region-logo');
  const titleEl = document.getElementById('prts-region-title');
  const infoEl = document.getElementById('prts-info-box');

  if (logoEl) {
    logoEl.src = reg.logo;
    logoEl.style.display = 'inline-block';
  }
  if (titleEl) titleEl.innerText = reg.name + " [" + reg.code + "]";
  
  if (infoEl) {
    if (currentActiveSection && reg.sections[currentActiveSection]) {
      infoEl.innerText = reg.sections[currentActiveSection];
    } else {
      infoEl.innerText = getPRTSText('info_placeholder');
    }
  }
}

function prtsShowSection(sectionKey) {
  if (!currentRegionId) return;
  currentActiveSection = sectionKey;
  const reg = getTerraData()[currentRegionId];
  const infoEl = document.getElementById('prts-info-box');
  if (infoEl && reg) {
    infoEl.innerText = reg.sections[sectionKey] || "N/A";
  }
}

function prtsShowTree() {
  if (!currentRegionId) return;
  const reg = getTerraData()[currentRegionId];
  const container = document.getElementById('prts-tree-container');
  if (!container) return;
  container.innerHTML = '';

  reg.operators.forEach(op => {
    const node = document.createElement('div');
    node.className = 'prts-op-node';
    node.onclick = () => prtsOpenDossier(op);
    node.innerHTML = `
      <img src="${op.avatar}" style="width: 45px; height: 45px; border-radius: 3px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/45?text=OP'">
      <div style="font-size: 0.6rem; color: #00f0ff; margin-top: 3px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">${op.name}</div>
    `;
    container.appendChild(node);
  });

  prtsShowView('prts-view-tree');
}

function prtsOpenDossier(op) {
  const dImg = document.getElementById('prts-d-img');
  const dName = document.getElementById('prts-d-name');
  const dRole = document.getElementById('prts-d-role');
  const dStatus = document.getElementById('prts-d-status');
  const dText = document.getElementById('prts-d-text');
  const dossier = document.getElementById('prts-dossier');

  if (dImg) dImg.src = op.avatar;
  if (dName) dName.innerText = op.name;
  if (dRole) dRole.innerText = op.role;
  if (dStatus) dStatus.innerText = getPRTSText('status') + op.status;
  if (dText) dText.innerText = op.dossier;
  if (dossier) dossier.classList.remove('hidden');
}

function prtsCloseDossier() {
  const dossier = document.getElementById('prts-dossier');
  if (dossier) dossier.classList.add('hidden');
}

// Перевод элементов на лету при смена языка
window.addEventListener('languageChanged', () => {
  const selectTitle = document.getElementById('prts-title-select');
  if (selectTitle) selectTitle.innerText = getPRTSText('select_region');

  const btnBackReg = document.getElementById('prts-btn-back-reg');
  if (btnBackReg) btnBackReg.innerText = getPRTSText('btn_back_regions');

  const btnBackDet = document.getElementById('prts-btn-back-det');
  if (btnBackDet) btnBackDet.innerText = getPRTSText('btn_back_detail');

  const btnPolInt = document.getElementById('prts-btn-pol-int');
  if (btnPolInt) btnPolInt.innerText = getPRTSText('btn_internal_pol');

  const btnPolExt = document.getElementById('prts-btn-pol-ext');
  if (btnPolExt) btnPolExt.innerText = getPRTSText('btn_external_pol');

  const btnGov = document.getElementById('prts-btn-gov');
  if (btnGov) btnGov.innerText = getPRTSText('btn_gov');

  const btnOps = document.getElementById('prts-btn-ops');
  if (btnOps) btnOps.innerText = getPRTSText('btn_ops');

  const btnCloseDos = document.getElementById('prts-btn-close-dos');
  if (btnCloseDos) btnCloseDos.innerText = getPRTSText('close_dossier');

  renderRegionsGrid();
  if (currentRegionId) {
    updateRegionViewData();
  }
});

// Автозапуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initPRTSConsole();
  
  // Дополнительно: если иконка Терминала открывает окно, переинициализируем интерфейс
  const terminalIcon = document.querySelector('[data-window="terminal"]') || document.getElementById('icon-terminal');
  if (terminalIcon) {
    terminalIcon.addEventListener('click', () => {
      setTimeout(initPRTSConsole, 50);
    });
  }
});
