// Roda após a DOM estar pronta
document.addEventListener('DOMContentLoaded', () => {
  console.debug('[scriptPaginaInicial] DOMContentLoaded');

  // ===== Ajusta padding-top com a altura real da navbar
  const navbar = document.querySelector('.navbar');
  const setNavbarHeight = () => {
    if (!navbar) { console.warn('[scriptPaginaInicial] navbar não encontrada'); return; }
    const h = navbar.getBoundingClientRect().height || 72;
    document.documentElement.style.setProperty('--navbar-h', `${h}px`);
    console.debug('[scriptPaginaInicial] navbar height set:', h);
  };
  setNavbarHeight();
  window.addEventListener('load', setNavbarHeight, { passive: true });
  window.addEventListener('resize', setNavbarHeight);

  // ===== Pop-up helpers (definidos antes do uso)
  const openPopup = (popup) => {
    if (!popup) { console.warn('openPopup: elemento não encontrado'); return; }
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden', 'false');
    const content = popup.querySelector('.popup-content');
    if (content) content.focus();
    console.debug('openPopup ->', popup.id);
  };

  const closePopup = (popup) => {
    if (!popup) return;
    popup.style.display = 'none';
    popup.setAttribute('aria-hidden', 'true');
    console.debug('closePopup ->', popup.id);
  };

  // ===== Animação de entrada dos .box
  const boxes = Array.from(document.querySelectorAll('.box'));
  console.debug('[scriptPaginaInicial] boxes found:', boxes.length);
  const showBox = (el) => el.classList.add('show');

  try {
    if ('IntersectionObserver' in window && boxes.length) {
      const autoOpened = new Set();
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            showBox(entry.target);
            const popupId = entry.target.getAttribute('data-popup');
            if (popupId && !autoOpened.has(popupId)) {
              setTimeout(() => {
                const popup = document.getElementById(popupId);
                if (popup) openPopup(popup);
                else console.warn('[IO] popup não encontrado:', popupId);
              }, 450);
              autoOpened.add(popupId);
            }
            obs.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.25 });
      boxes.forEach(b => io.observe(b));
      console.debug('[scriptPaginaInicial] IntersectionObserver ativo');
    } else if (boxes.length) {
      console.debug('[scriptPaginaInicial] Fallback scroll observer ativo');
      const checkBoxes = () => {
        const triggerBottom = window.innerHeight * 0.8;
        boxes.forEach(box => {
          const boxTop = box.getBoundingClientRect().top;
          if (boxTop < triggerBottom && !box.classList.contains('show')) {
            showBox(box);
            const popupId = box.getAttribute('data-popup');
            if (popupId) {
              const popup = document.getElementById(popupId);
              if (popup) openPopup(popup);
              else console.warn('[Fallback] popup não encontrado:', popupId);
            }
          }
        });
      };
      window.addEventListener('scroll', checkBoxes, { passive: true });
      checkBoxes();
    }
  } catch (err) {
    console.error('[scriptPaginaInicial] erro no observer', err);
  }

  // ===== Cards com data-href clicáveis (mouse + teclado)
  const clickableBoxes = document.querySelectorAll('.box[data-href]');
  clickableBoxes.forEach(box => {
    box.tabIndex = 0;
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
  const boxesPopup = Array.from(document.querySelectorAll('.box[data-popup], .team-card[data-popup]'));
  const popups = Array.from(document.querySelectorAll('.popup'));
  console.debug('[scriptPaginaInicial] boxesPopup:', boxesPopup.length, 'popups:', popups.length);

  // clicar nos boxes abre o popup (se houver data-popup)
  boxesPopup.forEach(box => {
    const popupId = box.getAttribute('data-popup');
    if (!popupId) return;
    box.tabIndex = 0;
    box.addEventListener('click', () => {
      const popup = document.getElementById(popupId);
      if (popup) openPopup(popup);
      else console.warn('click -> popup não encontrado:', popupId);
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const popup = document.getElementById(popupId);
        if (popup) openPopup(popup);
        else console.warn('key -> popup não encontrado:', popupId);
      }
    });
  });

  // Botões de fechar + clique fora + tecla ESC
  popups.forEach(popup => {
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(popup); });
    popup.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(popup); });
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

  // Debug helper — comandos rápidos para testar no console:
  console.info('[scriptPaginaInicial] para testar manualmente no Console:');
  console.info("  document.querySelectorAll('.box').length");
  console.info("  document.querySelectorAll('.popup').length");
  console.info("  document.getElementById('popup-jornada') && (document.getElementById('popup-jornada').style.display='flex')");
});

// fallback temporário: anexa click + scroll simples (cole no Console)
(function(){
  if (window._popupFallbackApplied) return console.log('fallback já aplicado');
  window._popupFallbackApplied = true;
  const boxes = Array.from(document.querySelectorAll('.box[data-popup], .team-card[data-popup]'));
  const popups = Array.from(document.querySelectorAll('.popup'));

  boxes.forEach(b => {
    b.style.cursor = 'pointer';
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-popup');
      const p = document.getElementById(id);
      if (!p) return console.warn('popup não encontrado', id);
      p.style.display = 'flex';
      p.setAttribute('aria-hidden','false');
    });
  });

  const onScrollCheck = () => {
    boxes.forEach(b => {
      if (b.classList.contains('shownFallback')) return;
      const r = b.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.8) {
        b.classList.add('shownFallback');
        const id = b.getAttribute('data-popup');
        const p = document.getElementById(id);
        if (p) {
          setTimeout(()=>{ p.style.display='flex'; p.setAttribute('aria-hidden','false'); }, 300);
        }
      }
    });
  };
  window.addEventListener('scroll', onScrollCheck, { passive: true });
  onScrollCheck();

  // fechar popups com clique fora ou ESC
  popups.forEach(p => {
    p.addEventListener('click', e => { if (e.target === p) { p.style.display='none'; p.setAttribute('aria-hidden','true'); } });
    p.querySelectorAll('.popup-close').forEach(btn => btn.addEventListener('click', () => { p.style.display='none'; p.setAttribute('aria-hidden','true'); }));
  });

  console.log('fallback aplicado:', boxes.length, 'boxes,', popups.length, 'popups');
})();