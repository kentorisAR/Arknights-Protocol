/* =========================================================
   PRTS MOBILE & ORIENTATION ADAPTER SYSTEM
   ========================================================= */

(function() {
  // 1. Проверяем, является ли устройство мобильным
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 850;
  }

  // 2. Создаем экран-предупреждение с просьбой повернуть телефон
  function createRotateOverlay() {
    if (document.getElementById('rotate-screen-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'rotate-screen-overlay';
    overlay.innerHTML = `
      <div class="rotate-content">
        <div class="rotate-icon">📱 🔄</div>
        <div class="rotate-title">PRTS // REQUIRES LANDSCAPE MODE</div>
        <div class="rotate-desc">Пожалуйста, поверните устройство горизонтально для корректной работы системы PRTS.</div>
      </div>
    `;

    // Стили для экрана поворота
    const style = document.createElement('style');
    style.innerHTML = `
      #rotate-screen-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(5, 12, 20, 0.98);
        border: 2px solid #00f0ff;
        z-index: 99999;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        backdrop-filter: blur(15px);
        box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.3);
      }
      .rotate-content {
        background: rgba(10, 20, 30, 0.8);
        border: 1px solid rgba(0, 240, 255, 0.5);
        padding: 25px;
        border-radius: 8px;
        max-width: 320px;
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
      }
      .rotate-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        animation: rotateAnim 2s infinite ease-in-out;
      }
      .rotate-title {
        color: #00f0ff;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 10px;
        letter-spacing: 1px;
      }
      .rotate-desc {
        color: #a0c0d0;
        font-size: 0.85rem;
        line-height: 1.4;
        font-family: monospace;
      }
      @keyframes rotateAnim {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(90deg); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
  }

  // 3. Проверка ориентации экрана
  function checkOrientation() {
    const overlay = document.getElementById('rotate-screen-overlay');
    if (!overlay) return;

    // Если это мобилка И телефон держится вертикально (portrait)
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';
    }
  }

  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    createRotateOverlay();
    checkOrientation();

    // Запрос на блокировку ориентации (если поддерживается мобильным браузером)
    if (screen.orientation && screen.orientation.lock) {
      window.addEventListener('click', () => {
        screen.orientation.lock('landscape').catch(() => {
          // Игнорируем, если браузер запретил авто-поворот
        });
      }, { once: true });
    }
  });

  // Отслеживаем поворот экрана и изменение размеров
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);
})();
