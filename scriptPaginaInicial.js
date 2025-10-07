const boxes = document.querySelectorAll('.box'); /* Seleciona todos os elementos com a classe 'box' */

const checkBoxes = () => { /* Função para verificar a posição das caixas */
  const triggerBottom = window.innerHeight * 0.8; /* Define o gatilho como 80% da altura da janela */

  boxes.forEach(box => { /* Para cada caixa */
    const boxTop = box.getBoundingClientRect().top; /* Obtém a posição superior da caixa em relação à viewport */

    if (boxTop < triggerBottom) { /* Se a parte superior da caixa estiver acima do gatilho */
      box.classList.add('show'); /* Adiciona a classe 'show' para animar */
    }
  });
};

window.addEventListener('scroll', checkBoxes); /* Adiciona um ouvinte de evento para o scroll da janela */
checkBoxes(); /* Chama a função inicialmente para verificar as caixas já visíveis */