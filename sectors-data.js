function showDossier(sectorKey) {
  const panel = document.getElementById('dossier-panel');
  const lang = window.currentLang || 'ru';

  if (typeof i18n !== 'undefined' && i18n[lang]) {
    const titleKey = `sec_${sectorKey}_title`;
    const descKey = `sec_${sectorKey}_desc`;
    const staffKey = `sec_${sectorKey}_staff`;

    if (i18n[lang][titleKey]) {
      document.getElementById('dossier-title').innerText = i18n[lang][titleKey];
      document.getElementById('dossier-desc').innerText = i18n[lang][descKey];
      document.getElementById('dossier-staff').innerHTML = i18n[lang][staffKey];
      panel.classList.add('active');
    }
  }
}

function hideDossier() {
  const panel = document.getElementById('dossier-panel');
  if (panel) {
    panel.classList.remove('active');
  }
}
