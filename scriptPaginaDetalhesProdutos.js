document.addEventListener("DOMContentLoaded", () => {

  // ✅ Banco de dados único
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
    }
  ];

  // ✅ pega o id da URL
  const id = new URLSearchParams(window.location.search).get("id");
  const produto = produtos.find(p => p.id === id);

  // ❌ produto não existe
  if (!produto) {
    document.getElementById("detalhes-produto").innerHTML = "<h2>Produto não encontrado</h2>";
    return;
  }

  // ✅ preencher elementos na página
  document.getElementById("produto-nome").textContent = produto.nome;
  document.getElementById("produto-descricao-curta").textContent = produto.descricaoCurta;
  document.getElementById("produto-descricao").textContent = produto.descricao;
  document.getElementById("produto-preco").textContent = produto.preco;

  const imgPrincipal = document.getElementById("produto-imagem");
  const miniaturas = document.getElementById("gal-miniaturas");

  let index = 0;
  imgPrincipal.src = produto.imagens[0];

  // ✅ gerar miniaturas
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

  // ✅ botões de navegação
  document.querySelector(".gal-prev").onclick = () => {
    index = (index - 1 + produto.imagens.length) % produto.imagens.length;
    imgPrincipal.src = produto.imagens[index];
  };

  document.querySelector(".gal-next").onclick = () => {
    index = (index + 1) % produto.imagens.length;
    imgPrincipal.src = produto.imagens[index];
  };

  // ✅ características
  const charList = document.getElementById("produto-caracteristicas");
  produto.caracteristicas.forEach(c => {
    charList.innerHTML += `<li>${c}</li>`;
  });

  // ✅ especificações
  const specs = document.getElementById("produto-especificacoes");
  Object.entries(produto.especificacoes).forEach(([k, v]) => {
    specs.innerHTML += `<dt>${k}</dt><dd>${v}</dd>`;
  });

  // ✅ botão comprar passando id
  document.getElementById("botao-comprar").href = `paginaCompra.html?id=${produto.id}`;
});
