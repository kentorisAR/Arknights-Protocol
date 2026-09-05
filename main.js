let currentLang = localStorage.getItem('prts_lang') || 'ru';
window.currentLang = currentLang;

function setLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('prts_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (typeof i18n !== 'undefined' && i18n[lang]) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang][key]) {
        el.innerText = i18n[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (i18n[lang][key]) {
        el.placeholder = i18n[lang][key];
      }
    });
  }
}

const targetLogin = "Doctor";
const targetPassword = "••••••••";
let loginProgress = 0;
let passwordProgress = 0;
let isTransitioning = false;

document.addEventListener('keydown', (e) => {
  if (isTransitioning) return;

  const loginInput = document.getElementById('login-input');
  const passwordInput = document.getElementById('password-input');
  const loginBtn = document.getElementById('login-btn');
  const hintText = document.getElementById('hint-text');

  if (loginProgress < targetLogin.length) {
    loginProgress++;
    loginInput.value = targetLogin.substring(0, loginProgress);
  } else if (passwordProgress < targetPassword.length) {
    passwordProgress++;
    passwordInput.value = targetPassword.substring(0, passwordProgress);
    if (passwordProgress === targetPassword.length) {
      loginBtn.classList.add('active');
      hintText.setAttribute('data-i18n', 'hintClick');
      setLanguage(currentLang);
    }
  }
});

function startLoginSequence() {
  if (isTransitioning) return;
  isTransitioning = true;

  const loginScreen = document.getElementById('login-screen');
  const videoOverlay = document.getElementById('video-overlay');
  const introVideo = document.getElementById('intro-video');
  const loginInput = document.getElementById('login-input');
  const passwordInput = document.getElementById('password-input');

  loginInput.value = targetLogin;
  passwordInput.value = targetPassword;

  videoOverlay.style.display = 'block';
  videoOverlay.style.opacity = '1';

  introVideo.currentTime = 0;
  
  introVideo.play().then(() => {
    loginScreen.style.display = 'none';
  }).catch(e => {
    console.log('Video play error:', e);
    loginScreen.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const introVideo = document.getElementById('intro-video');
  const videoOverlay = document.getElementById('video-overlay');
  const bgmDesktop = document.getElementById('bgm-desktop');

  if (introVideo) {
    introVideo.addEventListener('timeupdate', () => {
      const timeLeft = introVideo.duration - introVideo.currentTime;
      if (timeLeft <= 2 && videoOverlay.style.opacity !== '0') {
        videoOverlay.style.opacity = '0';

        if (bgmDesktop && bgmDesktop.paused) {
          bgmDesktop.volume = 0.4;
          bgmDesktop.play().catch(e => console.log('Audio error:', e));
        }
      }
    });

    introVideo.addEventListener('ended', () => {
      videoOverlay.style.display = 'none';
    });
  }

  setLanguage(currentLang);
});

function toggleStartMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById('start-menu');
  menu.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('start-menu');
  if (menu && !menu.classList.contains('hidden') && !e.target.closest('#start-menu') && !e.target.closest('.start-btn')) {
    menu.classList.add('hidden');
  }
});

function openWindow(id) {
  const win = document.getElementById(id);
  win.classList.remove('hidden');
  document.querySelectorAll('.window').forEach(w => w.style.zIndex = 1050);
  win.style.zIndex = 1100;
}

function closeWindow(id) {
  document.getElementById(id).classList.add('hidden');
}

function filterDesktop() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.icon').forEach(icon => {
    const name = icon.getAttribute('data-name');
    icon.style.display = name.includes(query) ? 'flex' : 'none';
  });
}

function dragWindow(e, windowId) {
  const win = document.getElementById(windowId);
  document.querySelectorAll('.window').forEach(w => w.style.zIndex = 1050);
  win.style.zIndex = 1100;

  let shiftX = e.clientX - win.getBoundingClientRect().left;
  let shiftY = e.clientY - win.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    win.style.left = pageX - shiftX + 'px';
    win.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
}
