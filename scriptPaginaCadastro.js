// Mostrar/ocultar senhas + validação + máscara de CEP
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');

  const senhaInput = document.getElementById('Senha');
  const confirmarSenhaInput = document.getElementById('ConfirmarSenha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const toggleConfirmarSenhaBtn = document.getElementById('toggleConfirmarSenha');
  const mensagemErro = document.getElementById('mensagemErroSenha');

  const cepInput = document.getElementById('CEP');

  const safe = (el) => !!el;
  const onlyDigits = (s) => String(s || '').replace(/\D+/g, '');

  // === Toggle de senha ===
  function togglePasswordVisibility(input, button) {
    if (!safe(input) || !safe(button)) return;
    const icon = button.querySelector('i');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    if (icon) icon.className = show ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
  }
  if (safe(toggleSenhaBtn)) {
    toggleSenhaBtn.addEventListener('click', () => togglePasswordVisibility(senhaInput, toggleSenhaBtn));
  }
  if (safe(toggleConfirmarSenhaBtn)) {
    toggleConfirmarSenhaBtn.addEventListener('click', () => togglePasswordVisibility(confirmarSenhaInput, toggleConfirmarSenhaBtn));
  }

  // === Validação Senha = Confirmar ===
  function validarSenhas() {
    if (!safe(senhaInput) || !safe(confirmarSenhaInput)) return true;
    const s = senhaInput.value.trim();
    const c = confirmarSenhaInput.value.trim();
    if (c && s !== c) {
      if (mensagemErro) {
        mensagemErro.textContent = 'As senhas não coincidem.';
        mensagemErro.style.color = '#E53E3E';
      }
      confirmarSenhaInput.style.borderColor = '#E53E3E';
      return false;
    }
    if (mensagemErro) mensagemErro.textContent = '';
    confirmarSenhaInput.style.borderColor = '';
    return true;
  }
  if (safe(senhaInput)) senhaInput.addEventListener('input', validarSenhas);
  if (safe(confirmarSenhaInput)) confirmarSenhaInput.addEventListener('input', validarSenhas);

  // === Máscara CEP: 00000-000 + validação ===
  function maskCEP(v) {
    const d = onlyDigits(v).slice(0, 8);
    if (d.length <= 5) return d;
    return d.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
  }
  if (safe(cepInput)) {
    cepInput.addEventListener('input', () => {
      const pos = cepInput.selectionStart;
      cepInput.value = maskCEP(cepInput.value);
      try { cepInput.setSelectionRange(pos, pos); } catch {}
    });
  }

  // === Submit ===
  if (safe(form)) {
    form.addEventListener('submit', (event) => {
      // senha=confirmar
      if (!validarSenhas()) {
        event.preventDefault();
        alert('Por favor, corrija a confirmação de senha.');
        return;
      }
      // CEP (8 dígitos)
      if (safe(cepInput)) {
        const len = onlyDigits(cepInput.value).length;
        if (len !== 8) {
          event.preventDefault();
          alert('CEP inválido. Digite 8 números (ex.: 13083-852).');
          cepInput.focus();
          return;
        }
      }
    });
  }
});
