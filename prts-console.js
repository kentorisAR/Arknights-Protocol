function renderPRTSConsole() {
  const terminalBody = document.querySelector('#terminal-win .window-body');
  if (!terminalBody) return;

  terminalBody.innerHTML = `
    <div style="font-family: monospace; padding: 10px;">
      <div style="font-size: 1.1rem; color: #00f0ff; margin-bottom: 15px; text-transform: uppercase;" data-i18n="selectRegion">
        Выберите регион
      </div>
      
      <div class="card" onclick="openUrsusRegion()" style="width: 140px; height: 140px; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: all 0.3s ease;">
        <svg style="width: 50px; height: 50px; fill: #00f0ff;" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <div style="font-size: 0.85rem; color: #00f0ff; font-weight: bold;" data-i18n="ursusCard">
          Империя Урсус
        </div>
      </div>
    </div>
  `;

  if (typeof setLanguage === 'function' && window.currentLang) {
    setLanguage(window.currentLang);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderPRTSConsole();
});
