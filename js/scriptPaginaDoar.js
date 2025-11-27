// Ajusta a altura real da navbar como padding-top da página
(function () {
  const navbar = document.querySelector('.navbar');
  const setNavbarHeight = () => {
    if (!navbar) return;
    const h = navbar.getBoundingClientRect().height || 72;
    document.documentElement.style.setProperty('--navbar-h', `${h}px`);
  };
  setNavbarHeight();
  window.addEventListener('load', setNavbarHeight, { passive: true });
  window.addEventListener('resize', setNavbarHeight);
})();

// Mostrar/ocultar senha
(function () {
  const btn = document.querySelector('.toggle-password');
  const input = document.querySelector('#senha');
  const error = document.querySelector('#senha-erro');

  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    btn.innerHTML = isPwd
      ? '<i class="fa-regular fa-eye-slash"></i>'
      : '<i class="fa-regular fa-eye"></i>';
  });

  // Validação mínima (exemplo rápido — lado do servidor deve validar também)
  input.addEventListener('input', () => {
    if (input.value.length && input.value.length < 6) {
      error.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    } else {
      error.textContent = '';
    }
  });
})();
