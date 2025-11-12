// Roda após a DOM estar pronta
document.addEventListener('DOMContentLoaded', () => {
  // ===== Ajusta padding-top com a altura real da navbar
  const navbar = document.querySelector('.navbar');
  const setNavbarHeight = () => {
    if (!navbar) return;
    const h = navbar.getBoundingClientRect().height || 72;
    document.documentElement.style.setProperty('--navbar-h', `${h}px`);
  };
  setNavbarHeight();
  window.addEventListener('load', setNavbarHeight, { passive: true });
  window.addEventListener('resize', setNavbarHeight);

  // ===== Animação de entrada dos .box
  const boxes = document.querySelectorAll('.box');

  const showBox = (el) => el.classList.add('show');

  if ('IntersectionObserver' in window && boxes.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showBox(entry.target);
          obs.unobserve(entry.target); // anima apenas uma vez
        }
      });
    }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.1 });
    boxes.forEach(b => io.observe(b));
  } else if (boxes.length) {
    // Fallback via scroll
    const checkBoxes = () => {
      const triggerBottom = window.innerHeight * 0.8;
      boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) showBox(box);
      });
    };
    window.addEventListener('scroll', checkBoxes, { passive: true });
    checkBoxes();
  }

  // ===== Cards com data-href clicáveis (mouse + teclado)
  const clickableBoxes = document.querySelectorAll('.box[data-href]');
  clickableBoxes.forEach(box => {
    box.tabIndex = 0; // foco por teclado
    box.addEventListener('click', function () {
      const url = this.getAttribute('data-href');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const url = box.getAttribute('data-href');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // ===== Pop-ups (data-popup)
  const boxesPopup = document.querySelectorAll('.box[data-popup]');
  const popups = document.querySelectorAll('.popup');

  const openPopup = (popup) => {
    if (!popup) return;
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden', 'false');

    // Move foco para conteúdo ao abrir (acessibilidade)
    const content = popup.querySelector('.popup-content');
    if (content) content.focus();
  };

  const closePopup = (popup) => {
    if (!popup) return;
    popup.style.display = 'none';
    popup.setAttribute('aria-hidden', 'true');
  };

  boxesPopup.forEach(box => {
    box.addEventListener('click', function () {
      const popupId = this.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      openPopup(popup);
    });
  });

  // Botões de fechar + clique fora + tecla ESC
  popups.forEach(popup => {
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closePopup(popup));
    }

    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup(popup);
    });

    popup.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup(popup);
    });
  });

  // ===== Botão "Saiba Mais" -> rolagem suave para #sobre
  const saibaMaisBtn = document.querySelector('.hero-btn');
  const sobreSection = document.querySelector('#sobre');
  if (saibaMaisBtn && sobreSection) {
    saibaMaisBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sobreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
