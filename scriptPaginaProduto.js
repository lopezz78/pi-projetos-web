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
    const total = obterCarrinho().reduce((s,i) => s + (i.qtd || 0), 0);
    cartCountEl.textContent = total;
  }
  function formatReal(num){ return 'R$ ' + Number(num || 0).toFixed(2).replace('.',','); }

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
      total += (item.preco || 0) * (item.qtd || 1);
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" />
        <div class="meta">
          <div class="nome">${item.nome}</div>
          <div class="meta-sub">${formatReal(item.preco)} x ${item.qtd}</div>
        </div>
        <div class="actions">
          <button class="icon-btn btn-remove" data-id="${item.id}" aria-label="Remover"><i class="fas fa-trash"></i></button>
          <div class="qty-controls">
            <button class="icon-btn btn-minus" data-id="${item.id}">−</button>
            <button class="icon-btn btn-plus" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(el);
    });
    cartTotalEl.textContent = formatReal(total);

    // attach handlers
    cartItemsEl.querySelectorAll('.btn-remove').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const newCart = obterCarrinho().filter(i => i.id !== id);
      salvarCarrinho(newCart);
      renderCart();
    }));
    cartItemsEl.querySelectorAll('.btn-plus').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const c = obterCarrinho();
      const it = c.find(i => i.id === id);
      if (it) { it.qtd = (it.qtd || 1) + 1; salvarCarrinho(c); renderCart(); }
    }));
    cartItemsEl.querySelectorAll('.btn-minus').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const c = obterCarrinho();
      const it = c.find(i => i.id === id);
      if (it) { it.qtd = Math.max(1, (it.qtd || 1) - 1); salvarCarrinho(c); renderCart(); }
    }));
  }

  // abrir/fechar modal e sincronizar via localStorage
  function openCartModal(){
    if (!cartModal) return;
    renderCart();
    cartModal.setAttribute('aria-hidden','false');
    cartModal.style.display = 'flex';
    try { localStorage.setItem('cart_open', String(Date.now())); } catch(e){}
  }
  function closeCartModal(){
    if (!cartModal) return;
    cartModal.setAttribute('aria-hidden','true');
    cartModal.style.display = 'none';
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


