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