document.addEventListener("DOMContentLoaded", () => {

  //  Banco de dados 
  const produtos = [
    {
      id: "1",
      nome: "Cadeira de Rodas",
      descricaoCurta: "Cadeira de Rodas Elétrica com Controle Remoto",
      descricao: "Cadeira de rodas elétrica confortável, com ajuste de encosto...",
      preco: "R$ 2.500,00 à vista ou R$ 2.900,00 em até 12x",
      imagens: [
        "Inclui+/CadeiraDeRodasEletrica.png",
        "Inclui+/CadeiraDeRodasEletrica2.png",
        "Inclui+/CadeiraDeRodasEletrica3.png"
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
        "Inclui+/AparelhoAuditivo.png",
        "Inclui+/AparelhoAuditivo2.png"
      ],
      caracteristicas: [
        "Bluetooth para smartphone",
        "Cancelamento ativo de ruído",
        "Bateria recarregável"
      ],
      especificacoes: {
        "Tipo": "Retroauricular",
        "Conectividade": "Bluetooth 5.0"
      }
    },

    {
      id: "3",
      nome: "Lupa Digital com Voz",
      descricaoCurta: "Lupa Digital com ampliação de até 30x",
      descricao: "Lupa digital com iluminação LED e função de voz...",
      preco: "R$ 1.500,00 à vista ou R$ 1.800,00 em até 12x",
      imagens: [
        "Inclui+/lupaDigital.png",
        "Inclui+/lupaDigital2.png",
        "Inclui+/lupaDigital3.png"
      ],
      caracteristicas: [
        "Ampliação até 30x",
        "Leitura em voz alta",
        "Tela LCD"
      ],
      especificacoes: {
        "Bateria": "Recarregável",
        "Peso": "350g"
      }
    },
    {
      id: "4",
      nome: "Faca de Serra Angulada",
      descricaoCurta: "Faca de Serra Angulada para cozinha",
      descricao: "Faca de serra angulada com lâmina de aço inoxidável...",
      preco: "R$ 150,00 à vista ou R$ 180,00 em até 3x",
      imagens: [
        "Inclui+/facaDeSerraAngulada.png",
        "Inclui+/facaDeSerraAngulada2.png",
        "Inclui+/facaDeSerraAngulada3.png"
      ],
      caracteristicas: [
        "Lâmina de aço inoxidável",
        "Cabo ergonômico",
        "Ideal para pães e bolos"
      ],
      especificacoes: {
        "Comprimento da lâmina": "20 cm",
        "Peso": "200g"
      }
    }, // ← vírgula adicionada aqui

    {
      id: "5",
      nome: "Tabua de Cozinha Adaptada",
      descricaoCurta: "Tábua de cozinha com suporte antiderrapante",
      descricao: "Tábua de cozinha adaptada com suporte antiderrapante e canaleta para líquidos...",
      preco: "R$ 80,00 à vista ou R$ 90,00 em até 2x",
      imagens: [
        "Inclui+/tabuaDeCozinhaAdaptada.png",
        "Inclui+/tabuaDeCozinhaAdaptada2.png"
      ],
      caracteristicas: [
        "Suporte antiderrapante",
        "Canaleta para líquidos",
        "Material resistente"
      ],
      especificacoes: {
        "Dimensões": "30x20 cm",
        "Peso": "500g"
      }
    }, 

    {
      id: "6",
      nome: "Tesoura de 5 Lâminas",
      descricaoCurta: "Tesoura com 5 lâminas para cortes precisos",
      descricao: "Tesoura de 5 lâminas ideal para cortes precisos em diversos materiais...",
      preco: "R$ 90,00 à vista ou R$ 100,00 em até 2x",

      imagens: [
        "Inclui+/tesoura5Laminas.png",
        "Inclui+/tesoura5Laminas2.png",
        "Inclui+/tesoura5Laminas3.png",
      ],
      caracteristicas: [
        "5 lâminas afiadas",
        "Cabo ergonômico",
        "Ideal para tecidos e papel"
      ],
      especificacoes: {
        "Comprimento": "15 cm",
        "Peso": "150g"
      }
    },
    {
      id: "7",
      nome: "Tablet Para Pessoas Com Autismo",
      descricaoCurta: "Tablet com interface simplificada e apps educativos",
      descricao: "Tablet especialmente desenvolvido para pessoas com autismo, com interface simplificada e aplicativos educativos...",
      preco: "R$ 1.800,00 à vista ou R$ 2.000,00 em até 12x",
      imagens: [
        "Inclui+/tabletParaAutismo1.png",
        "Inclui+/tabletParaAutismo2.png",
        "Inclui+/tabletParaAutismo3.png",
      ],
      caracteristicas: [
        "Interface simplificada",
        "Apps educativos pré-instalados",
        "Tela resistente"
      ],
      especificacoes: {
        "Tela": "10 polegadas",
        "Armazenamento": "64 GB"
      }
    },
    {
      id: "8",
      nome: "Teclado Em Braille",
      descricaoCurta: "Teclado portátil com saída em Braille",
      descricao: "Teclado portátil com saída em Braille, ideal para pessoas com deficiência visual...",
      preco: "R$ 3.000,00 à vista ou R$ 3.300,00 em até 12x",
      imagens: [
        "Inclui+/tecladoBraille1.png",
        "Inclui+/tecladoBraille2.png",
        "Inclui+/tecladoBraille3.png",
      ],
      caracteristicas: [
        "Saída em Braille",
        "Portátil e leve",
        "Compatível com diversos dispositivos"
      ],
      especificacoes: {
        "Conectividade": "Bluetooth e USB",
        "Peso": "500g"
      }
    },
    {
      id: "9",
      nome: "Vaso Sanitário Adaptado",
      descricaoCurta: "Vaso sanitário com altura ajustável e barras de apoio",
      descricao: "Vaso sanitário adaptado com altura ajustável e barras de apoio para maior segurança...",
      preco: "R$ 600,00 à vista ou R$ 700,00 em até 6x",
      imagens: [
        "Inclui+/vasoSanitarioPortatil2.png",
        "Inclui+/vasoSanitarioPortatil3.png",
        "Inclui+/vasoSanitarioPortatil4.png",
      ],
      caracteristicas: [ 
        "Altura ajustável",
        "Barras de apoio laterais",
        "Assento confortável"
      ],
      especificacoes: {
        "Material": "Plástico resistente",
        "Peso máximo suportado": "150 kg"
      }
    },
    {
      id: "10",
      nome: "Andador fixo 4 Rodas",
      descricaoCurta: "Andador com assento e rodas giratórias",
      descricao: "Andador fixo com 4 rodas, assento acolchoado e cesto para transporte...",
      preco: "R$ 450,00 à vista ou R$ 500,00 em até 6x",
      imagens: [
        "Inclui+/andador4Rodas1.png",
        "Inclui+/andador4Rodas2.png",
        "Inclui+/andador4Rodas3.png",
      ],
      caracteristicas: [
        "4 rodas giratórias",
        "Assento acolchoado",
        "Cesto para transporte"
      ],
      especificacoes: {
        "Peso máximo suportado": "120 kg",
        "Altura ajustável": "Sim"
      }
    }
             
  ]

  //  pega o id da URL
  const id = new URLSearchParams(window.location.search).get("id");
  const produto = produtos.find(p => p.id === id);

  // produto não existe
  if (!produto) {
    document.getElementById("detalhes-produto").innerHTML = "<h2>Produto não encontrado</h2>";
    return;
  }

  //  preencher elementos na página
  document.getElementById("produto-nome").textContent = produto.nome;
  document.getElementById("produto-descricao-curta").textContent = produto.descricaoCurta;
  document.getElementById("produto-descricao").textContent = produto.descricao;
  document.getElementById("produto-preco").textContent = produto.preco;

  const imgPrincipal = document.getElementById("produto-imagem");
  const miniaturas = document.getElementById("gal-miniaturas");

  let index = 0;
  imgPrincipal.src = produto.imagens[0];

  //  gerar miniaturas
  miniaturas.innerHTML = "";
  produto.imagens.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.addEventListener("click", () => {
      index = i;
      imgPrincipal.src = img;
    });
    miniaturas.appendChild(thumb);
  });

  //  botões de navegação
  document.querySelector(".gal-prev").onclick = () => {
    index = (index - 1 + produto.imagens.length) % produto.imagens.length;
    imgPrincipal.src = produto.imagens[index];
  };

  document.querySelector(".gal-next").onclick = () => {
    index = (index + 1) % produto.imagens.length;
    imgPrincipal.src = produto.imagens[index];
  };

  //  características
  const charList = document.getElementById("produto-caracteristicas");
  produto.caracteristicas.forEach(c => {
    charList.innerHTML += `<li>${c}</li>`;
  });

  //  especificações
  const specs = document.getElementById("produto-especificacoes");
  Object.entries(produto.especificacoes).forEach(([k, v]) => {
    specs.innerHTML += `<dt>${k}</dt><dd>${v}</dd>`;
  });

  //  botão comprar passando id
  document.getElementById("botao-comprar").href = `paginaCompra.html?id=${produto.id}`;
});
