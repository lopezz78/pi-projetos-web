document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  const emailEl = document.getElementById('Email');
  const senhaEl = document.getElementById('Senha');
  const toggleSenhaBtn = document.getElementById('toggleSenha');
  const msg = document.getElementById('msg');

  // Troca visibilidade da senha
  toggleSenhaBtn?.addEventListener('click', () => {
    const icon = toggleSenhaBtn.querySelector('i');
    const show = senhaEl.type === 'password';
    senhaEl.type = show ? 'text' : 'password';
    if (icon) icon.className = show ? 'bi bi-eye' : 'bi bi-eye-slash-fill';
  });

  // Base URL da API (ajuste se rodar em outra porta/host)
  const API_BASE = window.API_BASE || '';

  async function login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const err = data?.error || 'Falha no login';
      throw new Error(err);
    }
    return res.json();
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const email = emailEl.value.trim();
    const password = senhaEl.value;

    if (!email || !password) {
      msg.textContent = 'Informe email e senha.';
      return;
    }

    try {
      const data = await login(email, password);
      // Armazena o token (pode trocar para cookie httpOnly no backend, se preferir)
      localStorage.setItem('inclui_token', data.token);
      localStorage.setItem('inclui_user', JSON.stringify(data.user));

      // Redireciona (ajuste para a rota desejada)
      window.location.href = 'paginaInicial.html';
    } catch (err) {
      msg.textContent = err.message || 'Credenciais inválidas';
    }
  });
});
