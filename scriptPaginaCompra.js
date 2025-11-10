document.addEventListener('DOMContentLoaded', () => {
  const produtos = {
    '1': { id: '1', nome: 'Cadeira de Rodas', descricao: 'Cadeira elétrica - autonomia longa.', preco: 2500.00, imagem:'Inclui+/CadeiraDeRodasEletrica.png' },
    '2': { id: '2', nome: 'Aparelho Auditivo', descricao: 'Bluetooth com cancelamento de ruído.', preco: 2200.00, imagem:'Inclui+/AparelhoAuditivo.png' },
    '3': { id: '3', nome: 'Lupa Digital', descricao: 'Ampliação 30x com leitura em voz alta.', preco: 1500.00, imagem:'Inclui+/lupaDigital.png' },
    '4': { id: '4', nome: 'Faca de Serra Angulada', descricao: 'Faca especial para melhor aderência.', preco: 120.00, imagem:'Inclui+/FacaDeSerraAngulada.png' },
    '5': { id: '5', nome: 'Tabua de Cozinha Adaptada', descricao: 'Tabua com suporte antiderrapante.', preco: 80.00, imagem:'Inclui+/tabuaDeCozinhaAdaptada.png' },
    '6': { id: '6', nome: 'Tesoura de 5 Laminas', descricao: 'Corte preciso e seguro.', preco: 90.00, imagem:'Inclui+/tesouraDe5Laminas.png' },
    '7': { id: '7', nome: 'Tablet Para Pessoas Com Autismo', descricao: 'Interface simplificada e apps educativos.', preco: 1800.00, imagem:'Inclui+/tabletParaAutismo.png' },
    '8': { id: '8', nome: 'Teclado Em Braille', descricao: 'Teclado portátil com saída em Braille.', preco: 3000.00, imagem:'Inclui+/tecladoBraille1.png' },
    '9': { id: '9', nome: 'Vaso Sanitário Adaptado', descricao: 'Altura ajustável e barras de apoio.', preco: 600.00, imagem:'Inclui+/vasoSanitarioPortatil2.png' },
    '10': { id: '10', nome: 'Andador fixo 4 Rodas', descricao: 'Andador com assento e rodas giratórias.', preco: 450.00, imagem:'Inclui+/andador4Rodas1.png' }
  };

  const params = new URLSearchParams(window.location.search);
  
  const id = params.get('id') || '1';
  const produto = produtos[id] || Object.values(produtos)[0];

  const imgEl = document.getElementById('produto-imagem');
  const nomeEl = document.getElementById('produto-nome');
  const descEl = document.getElementById('produto-descricao');
  const precoEl = document.getElementById('produto-preco');
  const qtyInput = document.getElementById('qty');
  const incBtn = document.getElementById('incQty');
  const decBtn = document.getElementById('decQty');
  const addCartBtn = document.getElementById('btn-add-cart');
  const buyNowBtn = document.getElementById('btn-buy-now');
  const cartOpenBtn = document.getElementById('btn-cart-open');
  const cartModal = document.getElementById('cart-modal');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const btnCheckout = document.getElementById('btn-checkout');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutClose = document.getElementById('checkout-close');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutCancel = document.getElementById('checkout-cancel');

  imgEl.src = produto.imagem;
  imgEl.alt = produto.nome;
  nomeEl.textContent = produto.nome;
  descEl.textContent = produto.descricao;
  precoEl.textContent = formatReal(produto.preco);

  incBtn.addEventListener('click', ()=> qtyInput.value = Number(qtyInput.value) + 1);
  decBtn.addEventListener('click', ()=> { qtyInput.value = Math.max(1, Number(qtyInput.value) - 1); });

  function obterCarrinho(){ return JSON.parse(localStorage.getItem('cart')) || []; }
  function salvarCarrinho(cart){ localStorage.setItem('cart', JSON.stringify(cart)); atualizarContador(); }
  function atualizarContador(){ const c = obterCarrinho().reduce((s,i)=> s + i.qtd,0); if(cartCountEl) cartCountEl.textContent = c; }

  function formatReal(num){ return 'R$ ' + num.toFixed(2).replace('.',','); }

  addCartBtn.addEventListener('click', ()=>{
    const qtd = Math.max(1, Number(qtyInput.value));
    const cart = obterCarrinho();
    const existing = cart.find(i=> i.id === produto.id);
    if(existing){ existing.qtd += qtd; } else { cart.push({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd }); }
    salvarCarrinho(cart);
    alert('Produto adicionado ao carrinho');
  });

  cartOpenBtn.addEventListener('click', (e)=>{ e.preventDefault(); renderCart(); cartModal.setAttribute('aria-hidden','false'); });
  cartClose.addEventListener('click', ()=> cartModal.setAttribute('aria-hidden','true') );

  function renderCart(){
    const cart = obterCarrinho();
    cartItemsEl.innerHTML = '';
    if(cart.length === 0){ cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>'; cartTotalEl.textContent = formatReal(0); return; }
    let total = 0;
    cart.forEach(item=>{
      total += item.preco * item.qtd;
      const div = document.createElement('div'); div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="meta">
          <div style="font-weight:600">${item.nome}</div>
          <div style="color:var(--suporte)">${formatReal(item.preco)} x ${item.qtd}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <button class="icon-btn btn-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
          <div style="display:flex;gap:6px">
            <button class="icon-btn btn-minus" data-id="${item.id}">−</button>
            <button class="icon-btn btn-plus" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });
    cartTotalEl.textContent = formatReal(total);
    cartItemsEl.querySelectorAll('.btn-remove').forEach(b=>{
      b.addEventListener('click', ()=>{ const id = b.dataset.id; const newCart = obterCarrinho().filter(i=> i.id !== id); salvarCarrinho(newCart); renderCart(); });
    });
    cartItemsEl.querySelectorAll('.btn-plus').forEach(b=>{
      b.addEventListener('click', ()=>{ const id = b.dataset.id; const c = obterCarrinho(); c.find(i=> i.id===id).qtd++; salvarCarrinho(c); renderCart(); });
    });
    cartItemsEl.querySelectorAll('.btn-minus').forEach(b=>{
      b.addEventListener('click', ()=>{ const id = b.dataset.id; const c = obterCarrinho(); const it = c.find(i=> i.id===id); it.qtd = Math.max(1, it.qtd -1); salvarCarrinho(c); renderCart(); });
    });
  }

  btnClearCart.addEventListener('click', ()=>{ if(confirm('Esvaziar o carrinho?')){ salvarCarrinho([]); renderCart(); } });

  btnCheckout.addEventListener('click', ()=>{ cartModal.setAttribute('aria-hidden','true'); checkoutModal.setAttribute('aria-hidden','false'); });
  checkoutClose.addEventListener('click', ()=> checkoutModal.setAttribute('aria-hidden','true'));
  checkoutCancel.addEventListener('click', ()=> checkoutModal.setAttribute('aria-hidden','true'));

  checkoutForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const cart = obterCarrinho();
    if(cart.length === 0){ alert('Carrinho vazio'); return; }
    const order = {
      id: 'ORD' + Date.now(),
      nome: document.getElementById('checkout-nome').value,
      email: document.getElementById('checkout-email').value,
      cep: document.getElementById('checkout-cep').value,
      endereco: document.getElementById('checkout-endereco').value,
      itens: cart,
      total: cart.reduce((s,i)=> s + i.preco * i.qtd,0),
      data: new Date().toISOString()
    };
    /* Salvar pedido (LocalStorage) */
    const orders = JSON.parse(localStorage.getItem('orders')||'[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    atualizarContador();
    checkoutModal.setAttribute('aria-hidden','true');
    alert('Compra finalizada! ID do pedido: ' + order.id);
    window.location.href = 'paginaInicial.html';
  });

  buyNowBtn.addEventListener('click', ()=>{
    const qtd = Math.max(1, Number(qtyInput.value));
    localStorage.setItem('cart', JSON.stringify([{ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd }]));
    atualizarContador();
    renderCart();
    cartModal.setAttribute('aria-hidden','false');
  });

  atualizarContador();
}); 