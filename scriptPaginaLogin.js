document.addEventListener('DOMContentLoaded', () => {
  const form           = document.getElementById('form-login');
  const emailEl        = document.getElementById('Email');
  const senhaEl        = document.getElementById('Senha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const msg            = document.getElementById('msg');

  // Mostrar / ocultar senha
  toggleSenhaBtn?.addEventListener('click', () => {
    const icon = toggleSenhaBtn.querySelector('i');
    const show = senhaEl.type === 'password';
    senhaEl.type = show ? 'text' : 'password';
    if (icon) {
      icon.className = show ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
    }
  });

  // Envia login para a API PHP
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    msg.textContent = '';
    const email = emailEl.value.trim();
    const senha = senhaEl.value;

    if (!email || !senha) {
      msg.textContent = 'Informe email e senha.';
      return;
    }

    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Senha', senha);

    try {
      msg.textContent = 'Verificando dados...';

const res = await fetch('api/login.php', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});

const data = await res.json();
console.log('Resposta do login.php:', data);

if (!data.ok) {
  msg.textContent = data.erro || 'Falha ao fazer login.';
  return;

      }

      msg.textContent = data.msg || 'Login realizado com sucesso!';

      // Redireciona conforme o tipo (ajuste os arquivos se quiser)
      setTimeout(() => {
        if (data.tipo === 'cliente') {
          // depois você pode trocar por dashboard do cliente
          window.location.href = 'paginaInicial.html';
        } else if (data.tipo === 'empresa') {
          // depois você pode trocar por dashboard da empresa
          window.location.href = 'paginaInicial.html';
        } else {
          window.location.href = 'paginaInicial.html';
        }
      }, 800);

    } catch (err) {
      console.error(err);
      msg.textContent = 'Erro de comunicação com o servidor.';
    }
  });
});
