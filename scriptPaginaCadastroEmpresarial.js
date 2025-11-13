// Mostra/oculta senhas + validação (robusto)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro-empresa');

  const senhaInput = document.getElementById('Senha');
  const confirmarSenhaInput = document.getElementById('ConfirmarSenha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const toggleConfirmarSenhaBtn = document.getElementById('toggleConfirmarSenha');
  const mensagemErro = document.getElementById('mensagemErroSenha');

  const cnpjInput = document.getElementById('CNPJ');
  const contatoInput = document.getElementById('Contato');

  const safe = (el) => Boolean(el);

  function togglePasswordVisibility(input, button) {
    if (!safe(input) || !safe(button)) return;
    const icon = button.querySelector('i');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    if (icon) icon.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
  }

  if (safe(toggleSenhaBtn) && safe(senhaInput)) {
    toggleSenhaBtn.addEventListener('click', () => togglePasswordVisibility(senhaInput, toggleSenhaBtn));
  }
  if (safe(toggleConfirmarSenhaBtn) && safe(confirmarSenhaInput)) {
    toggleConfirmarSenhaBtn.addEventListener('click', () => togglePasswordVisibility(confirmarSenhaInput, toggleConfirmarSenhaBtn));
  }

  // Validação de senhas ao digitar
  function validarSenhas() {
    if (!safe(senhaInput) || !safe(confirmarSenhaInput)) return true;
    const senha = senhaInput.value.trim();
    const confirmar = confirmarSenhaInput.value.trim();

    if (confirmar && senha !== confirmar) {
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

  // Helpers de formatação leve (apenas números)
  const onlyDigits = (s) => s.replace(/\D+/g, '');

  // CNPJ: mantém apenas dígitos
  if (safe(cnpjInput)) {
    cnpjInput.addEventListener('input', () => {
      cnpjInput.value = onlyDigits(cnpjInput.value).slice(0, 14);
    });
  }

  // Contato: mantém dígitos, limita 11 (ex.: 11987654321)
  if (safe(contatoInput)) {
    contatoInput.addEventListener('input', () => {
      contatoInput.value = onlyDigits(contatoInput.value).slice(0, 11);
    });
  }

  // Validação final
  if (safe(form)) {
    form.addEventListener('submit', (event) => {
      // Senhas
      if (!validarSenhas()) {
        event.preventDefault();
        alert('Por favor, corrija a confirmação de senha.');
        return;
      }
      // CNPJ (14 dígitos)
      if (safe(cnpjInput) && onlyDigits(cnpjInput.value).length !== 14) {
        event.preventDefault();
        alert('CNPJ inválido. Informe os 14 dígitos.');
        cnpjInput.focus();
        return;
      }
      // Telefone (10 ou 11 dígitos)
      if (safe(contatoInput)) {
        const len = onlyDigits(contatoInput.value).length;
        if (len < 10 || len > 11) {
          event.preventDefault();
          alert('Telefone inválido. Use DDD + número (10 ou 11 dígitos).');
          contatoInput.focus();
          return;
        }
      }
    });
  }
});
