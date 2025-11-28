document.addEventListener("DOMContentLoaded", () => {
  // Altura real da navbar -> padding-top
  const navbar = document.querySelector(".navbar");
  const setNavbarHeight = () => {
    if (!navbar) return;
    const h = navbar.getBoundingClientRect().height || 72;
    document.documentElement.style.setProperty("--navbar-h", `${h}px`);
  };
  setNavbarHeight();
  window.addEventListener("load", setNavbarHeight, { passive: true });
  window.addEventListener("resize", setNavbarHeight);

  // "Banco de dados"
  const produtos = [
    {
      id: "1",
      nome: "Cadeira de Rodas",
      descricaoCurta: "Cadeira de Rodas Elétrica com Controle Remoto",
      descricao: "Cadeira de rodas elétrica confortável, com ajuste de encosto...",
      preco: "R$ 2.500,00 à vista ou R$ 2.900,00 em até 12x",
      imagens: [
        "../Inclui+/CadeiraDeRodasEletrica.png",
        "../Inclui+/CadeiraDeRodasEletrica2.png",
        "../Inclui+/CadeiraDeRodasEletrica3.png"
      ],
      caracteristicas: [
        "Controle remoto incluído",
        "Bateria de longa duração (8h)",
        "Suspensão nas rodas",
        "Assento acolchoado"
      ],
      especificacoes: {
        "Peso máximo suportado": "150 kg",
        "Autonomia": "Até 8 horas",
        "Velocidade máxima": "6 km/h"
      }
    },
    {
      id: "2",
      nome: "Aparelho Auditivo Bluetooth",
      descricaoCurta: "Aparelho auditivo com cancelamento de ruído",
      descricao: "Aparelho auditivo bluetooth com múltiplos níveis de ganho...",
      preco: "R$ 2.200,00 à vista ou R$ 2.500,00 em até 12x",
      imagens: [
        "../Inclui+/AparelhoAuditivo.png", 
        "../Inclui+/AparelhoAuditivo2.png"
      ],
      caracteristicas: [
        "Bluetooth para smartphone",
        "Cancelamento ativo de ruído",
        "Bateria recarregável"
      ],
      especificacoes: { "Tipo": "Retroauricular", "Conectividade": "Bluetooth 5.0" }
    },
    {
      id: "3",
      nome: "Lupa Digital com Voz",
      descricaoCurta: "Lupa Digital com ampliação de até 30x",
      descricao: "Lupa digital com iluminação LED e função de voz...",
      preco: "R$ 1.500,00 à vista ou R$ 1.800,00 em até 12x",
      imagens: [
        "../Inclui+/lupaDigital.png", 
        "../Inclui+/lupaDigital2.png", 
        "../Inclui+/lupaDigital3.png"
      ],
      caracteristicas: [
        "Ampliação até 30x", 
        "Leitura em voz alta", 
        "Tela LCD"
      ],
      especificacoes: { "Bateria": "Recarregável", "Peso": "350g" }
    },
    {
      id: "4",
      nome: "Irrigador Bucal",
      descricaoCurta: "Irrigador Bucal para higiene oral eficiente",
      descricao: "Irrigador bucal para higiene oral eficiente e confortável.",
      preco: "R$ 700,00 à vista ou R$ 900,00 em até 12x",
      imagens: [
        "../Inclui+/irrigadorbucal1.png",
        "../Inclui+/irrigadorbucal2.png",
        "../Inclui+/irrigadorbucal3.png"
      ],
      caracteristicas: [
        "Jato de água potente", 
        "Cabo ergonômico",
        "Ideal para higiene oral"
      ],
      especificacoes: { "": "20 cm", "Peso": "200g" }
    },
    {
      id: "5",
      nome: "Tábua de Cozinha Adaptada",
      descricaoCurta: "Tábua de cozinha com suporte antiderrapante",
      descricao: "Tábua de cozinha adaptada com suporte antiderrapante e canaleta para líquidos...",
      preco: "R$ 80,00 à vista ou R$ 90,00 em até 2x",
      imagens: [
        "../Inclui+/tabuaDeCozinhaAdaptada.png", 
        "../Inclui+/tabuaDeCozinhaAdaptada2.png"
      ],
      caracteristicas: [
        "Suporte antiderrapante", 
        "Canaleta para líquidos", 
        "Material resistente"
      ],
      especificacoes: { "Dimensões": "30x20 cm", "Peso": "500g" }
    },
    {
      id: "6",
      nome: "Tesoura de 5 Lâminas",
      descricaoCurta: "Tesoura com 5 lâminas para cortes precisos",
      descricao: "Tesoura de 5 lâminas ideal para cortes precisos em diversos materiais...",
      preco: "R$ 90,00 à vista ou R$ 100,00 em até 2x",
      imagens: [
        "../Inclui+/tesoura5Laminas.png", 
        "../Inclui+/tesoura5Laminas2.png", 
        "../Inclui+/tesoura5Laminas3.png"
      ],
      caracteristicas: [
        "5 lâminas afiadas", 
        "Cabo ergonômico", 
        "Ideal para tecidos e papel"
      ],
      especificacoes: { "Comprimento": "15 cm", "Peso": "150g" }
    },
    {
      id: "7",
      nome: "Tablet Para Pessoas Com Autismo",
      descricaoCurta: "Tablet com interface simplificada e apps educativos",
      descricao: "Tablet especialmente desenvolvido para pessoas com autismo, com interface simplificada e aplicativos educativos...",
      preco: "R$ 1.800,00 à vista ou R$ 2.000,00 em até 12x",
      imagens: [
        "../Inclui+/tabletParaAutismo1.png", 
        "../Inclui+/tabletParaAutismo2.png", 
        "../Inclui+/tabletParaAutismo3.png"
      ],
      caracteristicas: [
        "Interface simplificada", 
        "Apps educativos pré-instalados", 
        "Tela resistente"
      ],
      especificacoes: { "Tela": "10 polegadas", "Armazenamento": "64 GB" }
    },
    {
      id: "8",
      nome: "Teclado Em Braille",
      descricaoCurta: "Teclado portátil com saída em Braille",
      descricao: "Teclado portátil com saída em Braille, ideal para pessoas com deficiência visual...",
      preco: "R$ 3.000,00 à vista ou R$ 3.300,00 em até 12x",
      imagens: [
        "../Inclui+/tecladoBraille1.png", 
        "../Inclui+/tecladoBraille2.png", 
        "../Inclui+/tecladoBraille3.png"
      ],
      caracteristicas: [
        "Saída em Braille", 
        "Portátil e leve", 
        "Compatível com diversos dispositivos"
      ],
      especificacoes: { "Conectividade": "Bluetooth e USB", "Peso": "500g" }
    },
    {
      id: "9",
      nome: "Vaso Sanitário Adaptado",
      descricaoCurta: "Vaso sanitário com altura ajustável e barras de apoio",
      descricao: "Vaso sanitário adaptado com altura ajustável e barras de apoio para maior segurança...",
      preco: "R$ 600,00 à vista ou R$ 700,00 em até 6x",
      imagens: [
        "../Inclui+/vasoSanitarioPortatil2.png", 
        "../Inclui+/vasoSanitarioPortatil3.png", 
        "../Inclui+/vasoSanitarioPortatil4.png"
      ],
      caracteristicas: [
        "Altura ajustável", 
        "Barras de apoio laterais", 
        "Assento confortável"
      ],
      especificacoes: { "Material": "Plástico resistente", "Peso máximo suportado": "150 kg" }
    },
    {
      id: "10",
      nome: "Andador fixo 4 Rodas",
      descricaoCurta: "Andador com assento e rodas giratórias",
      descricao: "Andador fixo com 4 rodas, assento acolchoado e cesto para transporte...",
      preco: "R$ 450,00 à vista ou R$ 500,00 em até 6x",
      imagens: [
        "../Inclui+/andador4Rodas1.png", 
        "../Inclui+/andador4Rodas2.png", 
        "../Inclui+/andador4Rodas3.png",
      ],
      caracteristicas: [
        "4 rodas giratórias", 
        "Assento acolchoado", 
        "Cesto para transporte"
      ],
      especificacoes: { "Peso máximo suportado": "120 kg", "Altura ajustável": "Sim" }
    }
  ];

  // pega o id da URL
  const id = new URLSearchParams(window.location.search).get("id");
  const produto = produtos.find(p => p.id === id);

  const container = document.getElementById("detalhes-produto");
  if (!container) return;

  if (!produto) {
    container.innerHTML = "<h2>Produto não encontrado</h2>";
    return;
  }

  // Elementos
  const nomeEl        = document.getElementById("produto-nome");
  const descCurtaEl   = document.getElementById("produto-descricao-curta");
  const descEl        = document.getElementById("produto-descricao");
  const precoEl       = document.getElementById("produto-preco");
  const imgPrincipal  = document.getElementById("produto-imagem");
  const miniaturas    = document.getElementById("gal-miniaturas");
  const galeriaJanela = document.querySelector(".galeria-janela");
  const prevBtn       = document.querySelector(".gal-prev");
  const nextBtn       = document.querySelector(".gal-next");
  const charList      = document.getElementById("produto-caracteristicas");
  const specs         = document.getElementById("produto-especificacoes");
  const btnComprar    = document.getElementById("botao-comprar");

  // Preenche textos
  if (nomeEl)      nomeEl.textContent = produto.nome;
  if (descCurtaEl) descCurtaEl.textContent = produto.descricaoCurta;
  if (descEl)      descEl.textContent = produto.descricao;
  if (precoEl)     precoEl.textContent = produto.preco;

  // Imagem principal
  let index = 0;
  if (imgPrincipal) {
    imgPrincipal.src = produto.imagens[0];
    imgPrincipal.alt = produto.nome;
    imgPrincipal.onerror = () => (imgPrincipal.style.opacity = "0.5");
  }

  // Miniaturas
  if (miniaturas) {
    miniaturas.innerHTML = "";
    produto.imagens.forEach((src, i) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `${produto.nome} - imagem ${i + 1}`;
      if (i === 0) thumb.classList.add("active");
      thumb.addEventListener("click", () => {
        index = i;
        if (imgPrincipal) {
          imgPrincipal.src = src;
          imgPrincipal.alt = `${produto.nome} - imagem ${i + 1}`;
        }
        miniaturas.querySelectorAll("img").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
      });
      miniaturas.appendChild(thumb);
    });
  }

  // Navegação
  const go = (delta) => {
    index = (index + delta + produto.imagens.length) % produto.imagens.length;
    const src = produto.imagens[index];
    if (imgPrincipal) {
      imgPrincipal.src = src;
      imgPrincipal.alt = `${produto.nome} - imagem ${index + 1}`;
    }
    if (miniaturas) {
      const thumbs = miniaturas.querySelectorAll("img");
      thumbs.forEach(t => t.classList.remove("active"));
      if (thumbs[index]) thumbs[index].classList.add("active");
    }
  };

  if (prevBtn) prevBtn.addEventListener("click", () => go(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => go(1));

  // Teclado
  if (galeriaJanela) {
    galeriaJanela.tabIndex = 0;
    galeriaJanela.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
  }

  // Características
  if (charList) {
    charList.innerHTML = "";
    produto.caracteristicas.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      charList.appendChild(li);
    });
  }

  // Especificações
  if (specs) {
    specs.innerHTML = "";
    Object.entries(produto.especificacoes).forEach(([k, v]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      specs.appendChild(dt);
      specs.appendChild(dd);
    });
  }

  // Botão comprar
  if (btnComprar) btnComprar.href = `paginaCompra.html?id=${produto.id}`;
});
