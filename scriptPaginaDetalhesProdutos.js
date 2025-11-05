document.addEventListener('DOMContentLoaded', function () {
  // Obtém o parâmetro "id" da URL
  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get('id');
  console.log("ID do Produto:", produtoId); // Log para verificar o ID

  // Simula um banco de dados de produtos
  const produtos = {
    1: {
      nome: "Cadeira de Rodas",
      descricao: "Cadeira de Rodas Elétrica com Controle Remoto e Bateria de Longa duração.",
      preco: "R$2.500,00 à vista ou 2.900,00 parcelado em até 12x",
      imagem: "Inclui+/CadeiraDeRodasEletrica.png"
    },
    2: {
      nome: "Aparelho Auditivo Bluetooth",
      descricao: "Aparelho Auditivo Bluetooth com Cancelamento de Ruído.",
      preco: "R$2.200,00 à vista ou 2.500,00 parcelado em até 12x",
      imagem: "Inclui+/AparelhoAuditivo.png"
    },
    3: {
      nome: "Lupa Digital com Voz",
      descricao: "Lupa Digital com ampliação de até 30x e leitura em voz alta.",
      preco: "R$1.500,00 à vista ou 1.800,00 parcelado em até 12x",
      imagem: "Inclui+/lupaDigital.png"
    },
    4: {
      nome: "Faca de Serra Angulada",
      descricao: "Faca de Serra Angulada utilizada para facilitar o corde de alimentos.",
      preco: "R$700,00 à vista ou 900.00 parcelado em até 12x",
      imagem: "Inclui+/facaDeSerraAngulada.png"
    },
    5: {
      nome: "Tábua de cozinha adaptada",
      descricao: "Tábua de cozinha adaptada para facilitar pessoas com cortes de alimentos no dia a dia.",
      preco: "R$1.000,00 à vista ou 1.100.00 parcelado em até 12x",
      imagem: "Inclui+/tabuaDeCozinhaAdaptada.png"
    },
    6: {
      nome: "Tesoura 5 Laminas.",
      descricao: "Tesoura para cortar uma maior quantidade de alimentos de uma só vez.",
      preco: "R$700,00 à vista ou 750.00 parcelado em até 12x",
      imagem: "Inclui+/tesoura5Laminas.png"
    },
    7: {
      nome: "Tablet para Autismo.",
      descricao: 'Tablet com aplicativos educativos para crianças com autismo.',
      preco: "R$1.200,00 à vista ou 1.800.00 parcelado em até 12x",
      imagem: "Inclui+/tabletParaAutismo1.png"
    },
    8: {
      nome: "Teclado em Braille",
      descricao: "Teclado em Braille para facilitar a digitação de pessoas com deficiência visual.",
      preco: "R$800,00 à vista ou 1.000.00 parcelado em até 12x",
      imagem: "Inclui+/tecladoBraille1.png"
    }
  };

  // Busca os detalhes do produto pelo ID
  const produto = produtos[produtoId];
  console.log("Produto Encontrado:", produto); // Log para verificar o produto

  if (produto) {
    // Atualiza os elementos da página com os detalhes do produto
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-descricao').textContent = produto.descricao;
    document.getElementById('produto-preco').textContent = produto.preco;
    document.getElementById('produto-imagem').src = produto.imagem;
  } else {
    // Caso o produto não seja encontrado
    document.getElementById('detalhes-produto').innerHTML = "<p>Produto não encontrado.</p>";
  }
});

// Script para carregar detalhes do produto a partir do id na query string
(function () {
  const produtos = [
    {
      id: '1',
      nome: 'Cadeira de Rodas',
      descricaoCurta: 'Cadeira de Rodas Elétrica com Controle Remoto e Bateria de Longa duração',
      descricao: 'Cadeira de rodas elétrica confortável, com ajuste de encosto, controle remoto e autonomia de até 8 horas. Ideal para uso doméstico e externo. Peso suportado: 150kg. Assento acolchoado e rodas com suspensão.',
      preco: 'R$ 2.500,00 à vista ou R$ 2.900,00 em até 12x',
      imagens: [
        'Inclui+/CadeiraDeRodasEletrica.png',
        'Inclui+/CadeiraDeRodasEletrica2.png',
        'Inclui+/CadeiraDeRodasEletrica3.png'
      ],
      caracteristicas: [
        'Controle remoto incluído',
        'Bateria de longa duração (8h)',
        'Suspensão nas rodas',
        'Assento acolchoado'
      ],
      especificacoes: {
        'Peso máximo suportado': '150 kg',
        'Autonomia': 'Até 8 horas',
        'Velocidade máxima': '6 km/h',
        'Dimensões do assento': '45 x 45 cm'
      }
    },
    {
      id: '2',
      nome: 'Aparelho Auditivo Bluetooth',
      descricaoCurta: 'Aparelho Auditivo Bluetooth com Cancelamento de Ruído',
      descricao: 'Aparelho auditivo bluetooth com múltiplos níveis de ganho, cancelamento ativo de ruído e conectividade com smartphones para ajustes e streaming de áudio. Bateria recarregável com estojo.',
      preco: 'R$ 2.200,00 à vista ou R$ 2.500,00 em até 12x',
      imagens: [
        'Inclui+/AparelhoAuditivo.png',
        'Inclui+/AparelhoAuditivo2.png'
      ],
      caracteristicas: [
        'Bluetooth para smartphone',
        'Cancelamento ativo de ruído',
        'Bateria recarregável',
        'Várias pontas de silicone incluídas'
      ],
      especificacoes: {
        'Tipo': 'Retroauricular',
        'Duração da bateria': '24 horas (com estojo)',
        'Conectividade': 'Bluetooth 5.0',
        'Garantia': '1 ano'
      }
    },
    {
      id: '3',
      nome: 'Lupa Digital com Voz',
      descricaoCurta: 'Lupa Digital com ampliação de até 30x e leitura em voz alta',
      descricao: 'Lupa digital portátil com tela LCD, ampliação até 30x, contraste ajustável e função de leitura em voz alta para pessoas com baixa visão. Possui iluminação LED integrada.',
      preco: 'R$ 1.500,00 à vista ou R$ 1.800,00 em até 12x',
      imagens: [
        'Inclui+/lupaDigital.png',
        'Inclui+/lupaDigital2.png'
      ],
      caracteristicas: [
        'Ampliação até 30x',
        'Leitura em voz alta',
        'Iluminação LED',
        'Tela LCD integrada'
      ],
      especificacoes: {
        'Ampliação máxima': '30x',
        'Tela': 'LCD 5" (exemplo)',
        'Bateria': 'Recarregável 6 horas',
        'Peso': '350 g'
      }
    },
    {
      id: '4',
      nome: 'Faca de Serra Angulada',
      descricaoCurta: 'Faca de Serra Angulada utilizada para facilitar o corde de alimentos',
      descricao: 'Faca de serra angulada com cabo ergonômico, ideal para pessoas com mobilidade reduzida nas mãos. A lâmina serrilhada facilita o corte de pães, carnes e vegetais.',
      preco: 'R$ 700,00 à vista ou R$ 900,00 em até 12x',
      imagem: 'Inclui+/facaDeSerraAngulada.png',
      caracteristicas: [
        'Lâmina serrilhada',
        'Cabo ergonômico',
        'Aço inoxidável',
        'Fácil de limpar'
      ],
      especificacoes: {
        'Material da lâmina': 'Aço inoxidável',
        'Comprimento da lâmina': '20 cm',
        'Peso': '150 g',
        'Garantia': '6 meses'
      }
    },
    {
      id: '5',
      nome: 'Tábua de cozinha adaptada',
      descricaoCurta: 'Tábua de cozinha adaptada para facilitar pessoas com cortes de alimentos no dia a dia',
      descricao: 'Tábua de cozinha adaptada com bordas antiderrapantes e compartimentos para separar alimentos. Ideal para pessoas com mobilidade reduzida, facilitando o preparo das refeições.',
      preco: 'R$ 1.000,00 à vista ou R$ 1.100,00 em até 12x',
      imagem: 'Inclui+/tabuaDeCozinhaAdaptada.png',
      caracteristicas: [
        'Bordas antiderrapantes',
        'Compartimentos integrados',
        'Fácil de limpar',
        'Material durável'
      ],
      especificacoes: {
        'Material': 'Plástico BPA-free',
        'Dimensões': '40 x 30 cm',
        'Peso': '800 g',
        'Garantia': '1 ano'
      }
    },
    {
      id: '6',
      nome: 'Tesoura 5 Laminas.',
      descricaoCurta: 'Tesoura para cortar uma maior quantidade de alimentos de uma só vez',
      descricao: 'Tesoura com 5 lâminas afiadas, ideal para cortar ervas, legumes e outros alimentos rapidamente. Cabo ergonômico para maior conforto e controle durante o uso.',
      preco: 'R$ 700,00 à vista ou R$ 750,00 em até 12x',
      imagem: 'Inclui+/tesoura5Laminas.png',
      caracteristicas: [
        '5 lâminas afiadas',
        'Cabo ergonômico',
        'Fácil de limpar',
        'Aço inoxidável'
      ],
      especificacoes: {
        'Material das lâminas': 'Aço inoxidável',
        'Número de lâminas': '5',
        'Peso': '200 g',
        'Garantia': '6 meses'
      }
    },
    {
      id: '7',
      nome: 'Tablet para Autismo.',
      descricaoCurta: 'Tablet com aplicativos educativos para crianças com autismo.',
      descricao: 'Tablet desenvolvido para crianças com autismo, com aplicativos educativos, interface simplificada e controle parental. Inclui capa protetora resistente a quedas.',
      preco: 'R$ 1.200,00 à vista ou R$ 1.800,00 em até 12x',
      imagem: 'Inclui+/tabletParaAutismo1.png', 
      caracteristicas: [
        'Aplicativos educativos pré-instalados',
        'Interface simplificada',
        'Controle parental',
        'Capa protetora resistente'
      ],
      especificacoes: {
        'Tela': '8 polegadas',
        'Armazenamento': '32 GB',
        'Bateria': 'Até 10 horas',
        'Peso': '400 g'
      }
    },
    {
      id: '8',
      nome: 'Teclado em Braille',
      descricaoCurta: 'Teclado para facilitar a digitação de pessoas com deficiência visual.',
      descricao: 'Teclado em Braille compacto e portátil, ideal para pessoas com deficiência visual. Compatível com diversos dispositivos e sistemas operacionais, facilitando a digitação e navegação.',
      preco: 'R$ 800,00 à vista ou R$ 1.000,00 em até 12x',
      imagem: 'Inclui+/tecladoBraille1.png',
      caracteristicas: [
        'Teclas em Braille táteis',
        'Compatível com múltiplos dispositivos',
        'Design compacto e portátil',
        'Fácil de usar'
      ],
      especificacoes: {
        'Número de teclas': '40',
        'Conectividade': 'USB e Bluetooth',
        'Peso': '500 g',
        'Garantia': '1 ano'
      }
    }


  ];

  // Extrai o id da query string
  const qs = new URLSearchParams(window.location.search);
  const id = qs.get('id');

  // Referências aos elementos do DOM
  const imgEl = document.getElementById('produto-imagem');
  const miniaturasWrap = document.getElementById('gal-miniaturas');
  const nomeEl = document.getElementById('produto-nome');
  const descCurtaEl = document.getElementById('produto-descricao-curta');
  const descEl = document.getElementById('produto-descricao');
  const precoEl = document.getElementById('produto-preco');
  const charListEl = document.getElementById('produto-caracteristicas');
  const specsEl = document.getElementById('produto-especificacoes');
  const botaoVoltar = document.getElementById('botao-voltar');
  const botaoComprar = document.getElementById('botao-comprar');
  const btnPrev = document.querySelector('.gal-prev');
  const btnNext = document.querySelector('.gal-next');

  // Função para mostrar mensagem de produto não encontrado
  function mostrarNotFound() {
    nomeEl.textContent = 'Produto não encontrado';
    descCurtaEl.textContent = '';
    descEl.textContent = 'O produto solicitado não foi localizado.';
    precoEl.textContent = '';
    imgEl.removeAttribute('src');
    imgEl.alt = 'Produto não encontrado';
    miniaturasWrap.innerHTML = '';
    charListEl.innerHTML = '';
    specsEl.innerHTML = '';
  }

  const produto = produtos.find(p => p.id === id);
  if (!produto) { mostrarNotFound(); return; }

  nomeEl.textContent = produto.nome;
  descCurtaEl.textContent = produto.descricaoCurta;
  descEl.textContent = produto.descricao;
  precoEl.textContent = produto.preco;

  // Galeria
  const imagens = Array.isArray(produto.imagens) && produto.imagens.length ? produto.imagens : ['Inclui+/placeholder.png'];
  let currentIndex = 0;

  function atualizarImagem(index){
    currentIndex = Math.max(0, Math.min(index, imagens.length - 1));
    imgEl.src = imagens[currentIndex];
    imgEl.alt = produto.nome + ' — imagem ' + (currentIndex + 1);
    // atualiza miniaturas
    const thumbs = miniaturasWrap.querySelectorAll('img');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
    // esconder botões quando não necessário
    if (imagens.length <= 1) {
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
    } else {
      btnPrev.style.display = '';
      btnNext.style.display = '';
    }
  }

  // criar miniaturas
  miniaturasWrap.innerHTML = '';
  imagens.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = src;
    t.alt = produto.nome + ' miniatura ' + (i+1);
    t.addEventListener('click', () => atualizarImagem(i));
    miniaturasWrap.appendChild(t);
  });

  // arrow handlers
  btnPrev.addEventListener('click', () => atualizarImagem((currentIndex - 1 + imagens.length) % imagens.length));
  btnNext.addEventListener('click', () => atualizarImagem((currentIndex + 1) % imagens.length));

  // inicializa
  atualizarImagem(0);

  // Características
  charListEl.innerHTML = '';
  produto.caracteristicas.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    charListEl.appendChild(li);
  });

  // Especificações (dl)
  specsEl.innerHTML = '';
  Object.entries(produto.especificacoes).forEach(([chave, valor]) => {
    const dt = document.createElement('dt');
    dt.textContent = chave;
    const dd = document.createElement('dd');
    dd.textContent = valor;
    specsEl.appendChild(dt);
    specsEl.appendChild(dd);
  });

  botaoVoltar.addEventListener('click', () => window.history.back());
  botaoComprar.addEventListener('click', () => {
    window.location.href = `checkout.html?id=${produto.id}`;
  });
})();