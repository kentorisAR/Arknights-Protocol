const sectorData = {
  command: {
    titleKey: "sec_cmd_title",
    descKey: "sec_cmd_desc",
    staffKey: "sec_cmd_staff"
  },
  medical: {
    titleKey: "sec_med_title",
    descKey: "sec_med_desc",
    staffKey: "sec_med_staff"
  },
  engineering: {
    titleKey: "sec_eng_title",
    descKey: "sec_eng_desc",
    staffKey: "sec_eng_staff"
  }
};

function showDossier(sectorKey) {
  const panel = document.getElementById('dossier-panel');
  const lang = window.currentLang || localStorage.getItem('prts_lang') || 'ru';
  const sector = sectorData[sectorKey];

  if (sector && i18n[lang]) {
    document.getElementById('dossier-title').innerText = i18n[lang][sector.titleKey] || '';
    document.getElementById('dossier-desc').innerText = i18n[lang][sector.descKey] || '';
    document.getElementById('dossier-staff').innerHTML = i18n[lang][sector.staffKey] || '';
    panel.classList.add('active');
  }
}

function hideDossier() {
  document.getElementById('dossier-panel').classList.remove('active');
}
