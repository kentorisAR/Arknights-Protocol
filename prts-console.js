/* =========================================================
   PRTS NETWORK & ARCHIVE SYSTEM (prts-console.js)
   ========================================================= */

function getPRTSText(key) {
  const lang = window.currentLang || 'ru';
  return (consoleTranslations[lang] && consoleTranslations[lang][key]) || consoleTranslations['ru'][key] || key;
}

function getTerraData() {
  return {
    ursus: {
      id: "ursus",
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

let currentRegionId = null;

function initPRTSConsole() {
  const terminalWin = document.querySelector('#terminal-win .window-body');
  if (!terminalWin) return;

  terminalWin.innerHTML = `
    <div id="prts-console-wrapper" style="height: 100%; display: flex; flex-direction: column; font-family: monospace;">
      
      <!-- 1. СЕТКА РЕГИОНОВ -->
      <div id="prts-view-regions">
        <div id="prts-title-select" style="color: #00f0ff; margin-bottom: 15px; font-weight: bold;">${getPRTSText('select_region')}</div>
        <div id="prts-regions-grid" style="display: flex; gap: 15px; flex-wrap: wrap;"></div>
      </div>

      <!-- 2. МЕНЮ РЕГИОНА -->
      <div id="prts-view-detail" class="hidden">
        <button class="prts-btn-back" id="btn-back-reg" onclick="prtsShowView('prts-view-regions')">${getPRTSText('btn_back_regions')}</button>
        
        <div style="display: flex; align-items: center; gap: 12px; margin: 10px 0;">
          <img id="prts-region-logo" src="" style="width: 35px; height: 35px; object-fit: contain;">
          <h3 id="prts-region-title" style="color: #00f0ff; margin: 0;"></h3>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
          <button class="prts-nav-btn" id="btn-pol-int" onclick="prtsShowSection('politics_internal')">${getPRTSText('btn_internal_pol')}</button>
          <button class="prts-nav-btn" id="btn-pol-ext" onclick="prtsShowSection('politics_external')">${getPRTSText('btn_external_pol')}</button>
          <button class="prts-nav-btn" id="btn-gov" onclick="prtsShowSection('government')">${getPRTSText('btn_gov')}</button>
          <button class="prts-nav-btn" id="btn-ops" onclick="prtsShowTree()">${getPRTSText('btn_ops')}</button>
        </div>

        <div id="prts-info-box" style="background: rgba(0, 10, 20, 0.8); border: 1px solid rgba(0,240,255,0.3); padding: 10px; font-size: 0.8rem; color: #d8ecf8; min-height: 80px; border-radius: 4px;">
          ${getPRTSText('info_placeholder')}
        </div>
      </div>

      <!-- 3. ДРЕВО ОПЕРАТИВНИКОВ -->
      <div id="prts-view-tree" class="hidden" style="position: relative; flex-grow: 1;">
        <button class="prts-btn-back" id="btn-back-det" onclick="prtsShowView('prts-view-detail')">${getPRTSText('btn_back_detail')}</button>
        <div id="prts-tree-container" style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;"></div>

        <!-- ДОСЬЕ -->
        <div id="prts-dossier" class="hidden" style="position: absolute; right: 0; top: 0; bottom: 0; width: 240px; background: rgba(5,15,25,0.98); border: 1px solid #00f0ff; padding: 12px; border-radius: 6px; display: flex; flex-direction: column; gap: 8px; box-shadow: -5px 0 15px rgba(0,0,0,0.8); z-index: 10;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <img id="prts-d-img" src="" style="width: 50px; height: 50px; border: 1px solid #00f0ff; border-radius: 4px; object-fit: cover;">
            <div>
              <div id="prts-d-name" style="color: #00f0ff; font-weight: bold; font-size: 0.85rem;"></div>
              <div id="prts-d-role" style="color: #a0c0d0; font-size: 0.7rem;"></div>
            </div>
          </div>
          <div id="prts-d-status" style="font-size: 0.65rem; color: #00f0ff;"></div>
          <div id="prts-d-text" style="font-size: 0.7rem; color: #d8ecf8; line-height: 1.3;"></div>
          <button class="prts-btn-back" id="btn-close-dos" style="margin-top: auto; width: 100%; text-align: center;" onclick="prtsCloseDossier()">${getPRTSText('close_dossier')}</button>
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
      <img src="${reg.logo}" alt="${reg.name}" style="width: 40px; height: 40px; object-fit: contain;">
      <div style="color: #00f0ff; font-weight: bold; margin-top: 4px; font-size: 0.75rem;">${reg.name.split(' ')[0].toUpperCase()}</div>
    `;
    grid.appendChild(card);
  });
}

function prtsShowView(viewId) {
  document.getElementById('prts-view-regions').classList.add('hidden');
  document.getElementById('prts-view-detail').classList.add('hidden');
  document.getElementById('prts-view-tree').classList.add('hidden');
  document.getElementById(viewId).classList.remove('hidden');
}

function prtsOpenRegion(regionId) {
  currentRegionId = regionId;
  const reg = getTerraData()[regionId];
  if (!reg) return;
  
  document.getElementById('prts-region-logo').src = reg.logo;
  document.getElementById('prts-region-title').innerText = reg.name + " [" + reg.code + "]";
  document.getElementById('prts-info-box').innerText = getPRTSText('info_placeholder');
  prtsShowView('prts-view-detail');
}

function prtsShowSection(sectionKey) {
  if (!currentRegionId) return;
  const reg = getTerraData()[currentRegionId];
  document.getElementById('prts-info-box').innerText = reg.sections[sectionKey] || "N/A";
}

function prtsShowTree() {
  if (!currentRegionId) return;
  const reg = getTerraData()[currentRegionId];
  const container = document.getElementById('prts-tree-container');
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
  document.getElementById('prts-d-img').src = op.avatar;
  document.getElementById('prts-d-name').innerText = op.name;
  document.getElementById('prts-d-role').innerText = op.role;
  document.getElementById('prts-d-status').innerText = getPRTSText('status') + op.status;
  document.getElementById('prts-d-text').innerText = op.dossier;
  document.getElementById('prts-dossier').classList.remove('hidden');
}

function prtsCloseDossier() {
  document.getElementById('prts-dossier').classList.add('hidden');
}

// Переключение языка при клике на RU / EN / JP в панели
document.addEventListener('languageChanged', () => {
  initPRTSConsole();
  if (currentRegionId) prtsOpenRegion(currentRegionId);
});

document.addEventListener('DOMContentLoaded', initPRTSConsole);
