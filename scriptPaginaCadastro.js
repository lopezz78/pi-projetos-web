// Mostrar/ocultar senhas + validação simples e robusta
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');

  const senhaInput = document.getElementById('Senha');
  const confirmarSenhaInput = document.getElementById('ConfirmarSenha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const toggleConfirmarSenhaBtn = document.getElementById('toggleConfirmarSenha');
  const mensagemErro = document.getElementById('mensagemErroSenha');

  const safe = (el) => !!el;

  function togglePasswordVisibility(input, button) {
    if (!safe(input) || !safe(button)) return;
    const icon = button.querySelector('i');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    if (icon) icon.className = show ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
  }

  if (safe(toggleSenhaBtn)) {
    toggleSenhaBtn.addEventListener('click', () =>
      togglePasswordVisibility(senhaInput, toggleSenhaBtn)
    );
  }
  if (safe(toggleConfirmarSenhaBtn)) {
    toggleConfirmarSenhaBtn.addEventListener('click', () =>
      togglePasswordVisibility(confirmarSenhaInput, toggleConfirmarSenhaBtn)
    );
  }

  function validarSenhas() {
    if (!safe(senhaInput) || !safe(confirmarSenhaInput)) return true;
    const s = senhaInput.value.trim();
    const c = confirmarSenhaInput.value.trim();
    if (c && s !== c) {
      if (mensagemErro) mensagemErro.textContent = 'As senhas não coincidem.';
      confirmarSenhaInput.style.borderColor = '#E53E3E';
      return false;
    }
    if (mensagemErro) mensagemErro.textContent = '';
    confirmarSenhaInput.style.borderColor = '';
    return true;
  }

  if (safe(senhaInput)) senhaInput.addEventListener('input', validarSenhas);
  if (safe(confirmarSenhaInput)) confirmarSenhaInput.addEventListener('input', validarSenhas);

  if (safe(form)) {
    form.addEventListener('submit', (event) => {
      if (!validarSenhas()) {
        event.preventDefault();
        alert('Por favor, corrija os erros no formulário antes de continuar.');
      }
    });
  }
});
