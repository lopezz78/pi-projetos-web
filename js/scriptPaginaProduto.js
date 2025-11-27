document.addEventListener('DOMContentLoaded', () => {
  console.debug('[navbar] script loaded');

  const navbar = document.querySelector('.navbar');
  if (!navbar) { console.warn('Navbar não encontrada'); return; }

  // Altura da navbar para evitar sobreposição
  const setNavbarHeight = () => {
    const h = navbar.getBoundingClientRect().height || 72;
    document.documentElement.style.setProperty('--navbar-h', h + 'px');
  };
  setNavbarHeight();
  window.addEventListener('load', setNavbarHeight);
  window.addEventListener('resize', setNavbarHeight);

  // helpers de carrinho
  const cartCountEl = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartOpenBtn = document.getElementById('btn-cart-open');
  const cartCloseBtn = document.getElementById('cart-close');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const btnCheckout = document.getElementById('btn-checkout');

    /* ======= RECO CAROUSEL → Ir para compra ======= */
  // cada card precisa ter data-id no HTML (veja item 2)
  const goToBuy = (id) => {
    if (!id) return;
    window.location.href = `paginaCompra.html?id=${encodeURIComponent(String(id))}`;
  };

  document.querySelectorAll('.reco-card').forEach(card => {
    const id = card.dataset.id;
    // cursor/UX
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    if (!card.getAttribute('aria-label')) {
      const title = card.querySelector('.reco-title')?.textContent?.trim() || 'Produto';
      card.setAttribute('aria-label', `Comprar ${title}`);
    }

    // clique em qualquer área do card
    card.addEventListener('click', () => goToBuy(id));

    // teclado (Enter / Espaço)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToBuy(id);
      }
    });
  });

  // formatação de moeda
  const formatReal = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

  // util seguro para HTML
  const esc = (s) => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function obterCarrinho(){
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch(e){ console.warn('Erro parse cart', e); return []; }
  }
  function salvarCarrinho(cart){
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cart_updated_at', String(Date.now()));
    } catch(e){ console.warn('Erro salvar cart', e); }
    atualizarContadorLocal();
  }
  function atualizarContadorLocal(){
    if (!cartCountEl) return;
    const total = obterCarrinho().reduce((s,i) => s + (Number(i.qtd) || 0), 0);
    cartCountEl.textContent = total;
  }

  // render do carrinho
  function renderCart(){
    if (!cartItemsEl || !cartTotalEl) { console.debug('Elemento do cart não encontrado'); return; }
    const cart = obterCarrinho();
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
      cartTotalEl.textContent = formatReal(0);
      return;
    }
    let total = 0;
    cart.forEach(item => {
      const preco = Number(item.preco || 0);
      const qtd = Number(item.qtd || 1);
      total += preco * qtd;

      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${esc(item.imagem)}" alt="${esc(item.nome)}" />
        <div class="meta">
          <div class="nome">${esc(item.nome)}</div>
          <div class="meta-sub">${formatReal(preco)} x ${esc(qtd)}</div>
        </div>
        <div class="actions">
          <button class="icon-btn btn-remove" data-id="${esc(item.id)}" aria-label="Remover item"><i class="fas fa-trash"></i></button>
          <div class="qty-controls">
            <button class="icon-btn btn-minus" data-id="${esc(item.id)}" aria-label="Diminuir quantidade">−</button>
            <button class="icon-btn btn-plus" data-id="${esc(item.id)}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(el);
    });
    cartTotalEl.textContent = formatReal(total);

    // attach handlers (normalizando id como string)
    cartItemsEl.querySelectorAll('.btn-remove').forEach(b => b.addEventListener('click', () => {
      const id = String(b.dataset.id);
      const newCart = obterCarrinho().filter(i => String(i.id) !== id);
      salvarCarrinho(newCart);
      renderCart();
    }));
    cartItemsEl.querySelectorAll('.btn-plus').forEach(b => b.addEventListener('click', () => {
      const id = String(b.dataset.id);
      const c = obterCarrinho();
      const it = c.find(i => String(i.id) === id);
      if (it) { it.qtd = (Number(it.qtd) || 1) + 1; salvarCarrinho(c); renderCart(); }
    }));
    cartItemsEl.querySelectorAll('.btn-minus').forEach(b => b.addEventListener('click', () => {
      const id = String(b.dataset.id);
      const c = obterCarrinho();
      const it = c.find(i => String(i.id) === id);
      if (it) { it.qtd = Math.max(1, (Number(it.qtd) || 1) - 1); salvarCarrinho(c); renderCart(); }
    }));
  }

  // abrir/fechar modal e sincronizar via localStorage (usando só aria-hidden)
  function openCartModal(){
    if (!cartModal) return;
    renderCart();
    cartModal.setAttribute('aria-hidden','false');
    try { localStorage.setItem('cart_open', String(Date.now())); } catch(e){}
  }
  function closeCartModal(){
    if (!cartModal) return;
    cartModal.setAttribute('aria-hidden','true');
    try { localStorage.setItem('cart_open', '0'); } catch(e){}
  }

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', e => { e.preventDefault(); openCartModal(); });
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartModal);
  if (btnClearCart) btnClearCart.addEventListener('click', () => { if (confirm('Esvaziar o carrinho?')) { salvarCarrinho([]); renderCart(); } });
  if (btnCheckout) btnCheckout.addEventListener('click', () => { closeCartModal(); window.location.href = 'paginaCompra.html'; });

  // reage a mudanças de localStorage vindas de outras abas/páginas
  window.addEventListener('storage', (e) => {
    if (!e) return;
    if (e.key === 'cart' || e.key === 'cart_updated_at') {
      atualizarContadorLocal();
      if (cartModal && cartModal.getAttribute('aria-hidden') === 'false') renderCart();
    }
    if (e.key === 'cart_open') {
      try {
        const val = localStorage.getItem('cart_open');
        if (val && val !== '0') openCartModal();
        else closeCartModal();
      } catch(err){ console.warn(err); }
    }
  });

  // inicial
  atualizarContadorLocal();
});
