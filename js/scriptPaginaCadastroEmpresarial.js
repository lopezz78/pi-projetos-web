// Mostra/oculta senhas + máscaras e validações
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro-empresa');

  const senhaInput = document.getElementById('Senha');
  const confirmarSenhaInput = document.getElementById('ConfirmarSenha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const toggleConfirmarSenhaBtn = document.getElementById('toggleConfirmarSenha');
  const mensagemErro = document.getElementById('mensagemErroSenha');

  const cnpjInput = document.getElementById('CNPJ');
  const contatoInput = document.getElementById('Contato');
  const cepInput = document.getElementById('CEP');

  // util
  const safe = (el) => Boolean(el);
  const onlyDigits = (s) => String(s || '').replace(/\D+/g, '');

  function togglePasswordVisibility(input, button) {
    if (!safe(input) || !safe(button)) return;
    const icon = button.querySelector('i');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    if (icon) icon.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
  }

  // === Senha: toggle + validação de confirmação ===
  if (safe(toggleSenhaBtn) && safe(senhaInput)) {
    toggleSenhaBtn.addEventListener('click', () => togglePasswordVisibility(senhaInput, toggleSenhaBtn));
  }
  if (safe(toggleConfirmarSenhaBtn) && safe(confirmarSenhaInput)) {
    toggleConfirmarSenhaBtn.addEventListener('click', () => togglePasswordVisibility(confirmarSenhaInput, toggleConfirmarSenhaBtn));
  }

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

  // === Máscara CNPJ: 00.000.000/0001-00 ===
  function maskCNPJ(v) {
    const d = onlyDigits(v).slice(0, 14);
    let out = d;
    if (d.length > 12) out = d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5');
    else if (d.length > 8) out = d.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
    else if (d.length > 5) out = d.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
    else if (d.length > 2) out = d.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
    return out;
  }
  if (safe(cnpjInput)) {
    cnpjInput.addEventListener('input', () => {
      const pos = cnpjInput.selectionStart;
      cnpjInput.value = maskCNPJ(cnpjInput.value);
      // melhor experiência: tenta manter o cursor onde estava
      try { cnpjInput.setSelectionRange(pos, pos); } catch {}
    });
  }

  // === Máscara CEP: 00000-000 ===
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

  // === Máscara telefone (BR): (11) 91234-5678 ou (11) 1234-5678 ===
  function maskPhone(v) {
    const d = onlyDigits(v).slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return d.replace(/^(\d{2})(\d{0,4}).*/, '($1) $2');
    if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    return d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  }
  if (safe(contatoInput)) {
    contatoInput.addEventListener('input', () => {
      const pos = contatoInput.selectionStart;
      contatoInput.value = maskPhone(contatoInput.value);
      try { contatoInput.setSelectionRange(pos, pos); } catch {}
    });
  }

  // === Validação final ===
  if (safe(form)) {
    form.addEventListener('submit', (event) => {
      // confirmações de senha
      if (!validarSenhas()) {
        event.preventDefault();
        alert('Por favor, corrija a confirmação de senha.');
        return;
      }

      // CNPJ (14 dígitos)
      if (safe(cnpjInput)) {
        const cnpjDigits = onlyDigits(cnpjInput.value);
        if (cnpjDigits.length !== 14) {
          event.preventDefault();
          alert('CNPJ inválido. Informe os 14 dígitos.');
          cnpjInput.focus();
          return;
        }
      }

      // CEP (8 dígitos)
      if (safe(cepInput)) {
        const cepDigits = onlyDigits(cepInput.value);
        if (cepDigits.length !== 8) {
          event.preventDefault();
          alert('CEP inválido. Digite 8 números (ex.: 13083-852).');
          cepInput.focus();
          return;
        }
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
