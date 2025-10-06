// Esconde a navbar quando rola para baixo e mostra quando rola para cima
(function () {
  console.debug('[navbar] script loaded');
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.warn('[navbar] element not found');
    return;
  }

  // Define a altura real da navbar para não sobrepor o conteúdo
  const setNavbarHeight = () => {
    const h = navbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--navbar-h', h + 'px');
  };
  setNavbarHeight();
  // Recalcular também após todos os recursos carregarem (imagens podem alterar altura)
  window.addEventListener('load', setNavbarHeight);
  window.addEventListener('resize', setNavbarHeight);

  // Esconde/mostra conforme direção do scroll (com tolerância p/ evitar tremedeira)
  let lastY = window.scrollY;
  let ticking = false;
  const tolerance = 8;

  const onScroll = () => {
    const currentY = window.scrollY;

    // sempre mostra quando está no topo
    if (currentY <= 0) {
      navbar.classList.remove('navbar--hidden');
      lastY = currentY;
      ticking = false;
      return;
    }

    if (Math.abs(currentY - lastY) > tolerance) {
      if (currentY > lastY) {
        // rolando para baixo
        navbar.classList.add('navbar--hidden');
      } else {
        // rolando para cima
        navbar.classList.remove('navbar--hidden');
      }
      lastY = currentY;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();
