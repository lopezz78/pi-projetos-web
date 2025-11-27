document.addEventListener('DOMContentLoaded', () => {
  // ---------- util ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const safeNumber = (v, d = 0) => (Number.isFinite(+v) ? +v : d);
  const formatReal = (num) =>
    'R$ ' + (safeNumber(num).toFixed(2)).replace('.', ',');

  const readLS = (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  };
  const writeLS = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { console.warn('localStorage falhou:', k, e); return false; }
  };

  // ---------- “banco de dados” local ----------
  // Padronizei nomes de imagens para casar com seus assets já usados nas outras páginas
  const produtos = {
    '1': { id: '1', nome: 'Cadeira de Rodas', descricao: 'Cadeira elétrica - autonomia longa.', preco: 2500.00, imagem:'Inclui+/CadeiraDeRodasEletrica.png' },
    '2': { id: '2', nome: 'Aparelho Auditivo', descricao: 'Bluetooth com cancelamento de ruído.', preco: 2200.00, imagem:'Inclui+/AparelhoAuditivo.png' },
    '3': { id: '3', nome: 'Lupa Digital', descricao: 'Ampliação 30x com leitura em voz alta.', preco: 1500.00, imagem:'Inclui+/lupaDigital.png' },
    '4': { id: '4', nome: 'Irrigador Bucal', descricao: 'Irrigador bucal para higiene oral eficiente e confortável.', preco: 700.00, imagem:'Inclui+/irrigadorbucal1.png' },
    '5': { id: '5', nome: 'Tábua de Cozinha Adaptada', descricao: 'Tábua com suporte antiderrapante.', preco: 80.00, imagem:'Inclui+/tabuaDeCozinhaAdaptada.png' },
    '6': { id: '6', nome: 'Tesoura de 5 Lâminas', descricao: 'Corte preciso e seguro.', preco: 90.00, imagem:'Inclui+/tesoura5Laminas.png' },
    '7': { id: '7', nome: 'Tablet para Autismo', descricao: 'Interface simplificada e apps educativos.', preco: 1800.00, imagem:'Inclui+/tabletParaAutismo1.png' },
    '8': { id: '8', nome: 'Teclado em Braille', descricao: 'Teclado portátil com saída em Braille.', preco: 3000.00, imagem:'Inclui+/tecladoBraille1.png' },
    '9': { id: '9', nome: 'Vaso Sanitário Adaptado', descricao: 'Altura ajustável e barras de apoio.', preco: 600.00, imagem:'Inclui+/vasoSanitarioPortatil2.png' },
    '10': { id: '10', nome: 'Andador fixo 4 Rodas', descricao: 'Andador com assento e rodas giratórias.', preco: 450.00, imagem:'Inclui+/andador4Rodas1.png' }
  };

  // ---------- pega produto ----------
  const idParam = new URLSearchParams(window.location.search).get('id') || '1';
  const produto = produtos[idParam] || Object.values(produtos)[0];

  // ---------- mapeia DOM (com checagem) ----------
  const imgEl         = $('#produto-imagem');
  const nomeEl        = $('#produto-nome');
  const descEl        = $('#produto-descricao');
  const precoEl       = $('#produto-preco');
  const qtyInput      = $('#qty');
  const incBtn        = $('#incQty');
  const decBtn        = $('#decQty');
  const addCartBtn    = $('#btn-add-cart');
  const buyNowBtn     = $('#btn-buy-now');

  const cartOpenBtn   = $('#btn-cart-open');
  const cartModal     = $('#cart-modal');
  const cartClose     = $('#cart-close');
  const cartItemsEl   = $('#cart-items');
  const cartTotalEl   = $('#cart-total');
  const cartCountEl   = $('#cart-count');
  const btnClearCart  = $('#btn-clear-cart');
  const btnCheckout   = $('#btn-checkout');

  const checkoutModal = $('#checkout-modal');
  const checkoutClose = $('#checkout-close');
  const checkoutForm  = $('#checkout-form');
  const checkoutCancel= $('#checkout-cancel');

  // ---------- preenche produto ----------
  if (imgEl)   { imgEl.src = produto.imagem; imgEl.alt = produto.nome; }
  if (nomeEl)  nomeEl.textContent = produto.nome;
  if (descEl)  descEl.textContent = produto.descricao;
  if (precoEl) precoEl.textContent = formatReal(produto.preco);

  // ---------- quantidade ----------
  if (qtyInput) qtyInput.value = 1;

  if (incBtn && qtyInput) {
    incBtn.addEventListener('click', () => {
      qtyInput.value = safeNumber(qtyInput.value, 1) + 1;
    });
  }
  if (decBtn && qtyInput) {
    decBtn.addEventListener('click', () => {
      qtyInput.value = Math.max(1, safeNumber(qtyInput.value, 1) - 1);
    });
  }

  // ---------- carrinho ----------
  const obterCarrinho = () => readLS('cart', []);
  const salvarCarrinho = (cart) => {
    writeLS('cart', cart);
    atualizarContador();
    try { localStorage.setItem('cart_updated_at', String(Date.now())); } catch {}
  };
  const atualizarContador = () => {
    if (!cartCountEl) return;
    const total = obterCarrinho().reduce((s, i) => s + safeNumber(i.qtd, 0), 0);
    cartCountEl.textContent = total;
  };

  // add ao carrinho
  if (addCartBtn && qtyInput) {
    addCartBtn.addEventListener('click', () => {
      const qtd = Math.max(1, safeNumber(qtyInput.value, 1));
      const cart = obterCarrinho();
      const existing = cart.find(i => i.id === produto.id);
      if (existing) existing.qtd = safeNumber(existing.qtd, 0) + qtd;
      else cart.push({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd });
      salvarCarrinho(cart);
      alert('Produto adicionado ao carrinho.');
    });
  }

  // render modal do carrinho
  const renderCart = () => {
    if (!cartItemsEl || !cartTotalEl) return;
    const cart = obterCarrinho();
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
      cartTotalEl.textContent = formatReal(0);
      return;
    }
    let total = 0;
    cart.forEach(item => {
      const preco = safeNumber(item.preco, 0);
      const qtd   = Math.max(1, safeNumber(item.qtd, 1));
      total += preco * qtd;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="meta">
          <div style="font-weight:600">${item.nome}</div>
          <div style="color:var(--suporte)">${formatReal(preco)} x ${qtd}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <button class="icon-btn btn-remove" data-id="${item.id}" aria-label="Remover"><i class="fas fa-trash"></i></button>
          <div style="display:flex;gap:6px">
            <button class="icon-btn btn-minus" data-id="${item.id}" aria-label="Diminuir">−</button>
            <button class="icon-btn btn-plus"  data-id="${item.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });
    cartTotalEl.textContent = formatReal(total);

    // ações por item
    $$('.btn-remove').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const newCart = obterCarrinho().filter(i => i.id !== id);
      salvarCarrinho(newCart);
      renderCart();
    }));
    $$('.btn-plus').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const c = obterCarrinho();
      const it = c.find(i => i.id === id);
      if (it) it.qtd = safeNumber(it.qtd, 1) + 1;
      salvarCarrinho(c);
      renderCart();
    }));
    $$('.btn-minus').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      const c = obterCarrinho();
      const it = c.find(i => i.id === id);
      if (it) it.qtd = Math.max(1, safeNumber(it.qtd, 1) - 1);
      salvarCarrinho(c);
      renderCart();
    }));
  };

  // abrir/fechar carrinho (usa apenas aria-hidden; CSS controla display)
  if (cartOpenBtn && cartModal) {
    cartOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCart();
      cartModal.setAttribute('aria-hidden', 'false');
      try { localStorage.setItem('cart_open', String(Date.now())); } catch {}
    });
  }
  if (cartClose && cartModal) {
    cartClose.addEventListener('click', () => {
      cartModal.setAttribute('aria-hidden', 'true');
      try { localStorage.setItem('cart_open', '0'); } catch {}
    });
  }
  // fecha modal com ESC ou clique fora
  if (cartModal) {
    cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cartModal.setAttribute('aria-hidden','true'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cartModal.setAttribute('aria-hidden','true'); });
  }

  if (btnClearCart) {
    btnClearCart.addEventListener('click', () => {
      if (confirm('Esvaziar o carrinho?')) { salvarCarrinho([]); renderCart(); }
    });
  }

  // checkout
  if (btnCheckout && cartModal && checkoutModal) {
    btnCheckout.addEventListener('click', () => {
      cartModal.setAttribute('aria-hidden', 'true');
      checkoutModal.setAttribute('aria-hidden', 'false');
    });
  }
  if (checkoutClose && checkoutModal) {
    checkoutClose.addEventListener('click', () => checkoutModal.setAttribute('aria-hidden', 'true'));
  }
  if (checkoutCancel && checkoutModal) {
    checkoutCancel.addEventListener('click', () => checkoutModal.setAttribute('aria-hidden', 'true'));
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cart = obterCarrinho();
      if (cart.length === 0) { alert('Carrinho vazio'); return; }

      const order = {
        id: 'ORD' + Date.now(),
        nome: $('#checkout-nome')?.value || '',
        email: $('#checkout-email')?.value || '',
        cep: $('#checkout-cep')?.value || '',
        endereco: $('#checkout-endereco')?.value || '',
        itens: cart,
        total: cart.reduce((s, i) => s + safeNumber(i.preco, 0) * Math.max(1, safeNumber(i.qtd,1)), 0),
        data: new Date().toISOString()
      };

      const orders = readLS('orders', []);
      orders.push(order);
      writeLS('orders', orders);
      writeLS('cart', []);
      atualizarContador();
      checkoutModal?.setAttribute('aria-hidden', 'true');
      alert('Compra finalizada! ID do pedido: ' + order.id);
      window.location.href = 'paginaInicial.html';
    });
  }

  // comprar agora
  if (buyNowBtn && qtyInput) {
    buyNowBtn.addEventListener('click', () => {
      const qtd = Math.max(1, safeNumber(qtyInput.value, 1));
      writeLS('cart', [{ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd }]);
      atualizarContador();
      renderCart();
      cartModal?.setAttribute('aria-hidden', 'false');
      try { localStorage.setItem('cart_open', String(Date.now())); } catch {}
    });
  }

  // sincroniza entre abas
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart' || e.key === 'cart_updated_at') {
      atualizarContador();
      if (cartModal?.getAttribute('aria-hidden') === 'false') renderCart();
    }
    if (e.key === 'cart_open') {
      const v = localStorage.getItem('cart_open');
      if (!cartModal) return;
      cartModal.setAttribute('aria-hidden', v && v !== '0' ? 'false' : 'true');
      if (v && v !== '0') renderCart();
    }
  });

  atualizarContador();
});
