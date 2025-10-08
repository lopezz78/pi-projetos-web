// Garante que o script só rode depois que a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {

  // =================================================================
  // PARTE 1: ANIMAÇÃO DAS CAIXAS AO ROLAR A PÁGINA (SCROLL)
  // =================================================================
  // Esta parte faz os cards aparecerem suavemente conforme você rola a página
  
  const boxesParaAnimar = document.querySelectorAll('.box');
  
  if (boxesParaAnimar.length > 0) {
    const checkBoxes = () => {
      // Define a "linha gatilho" a 80% da altura da tela
      const triggerBottom = window.innerHeight * 0.8;
      
      boxesParaAnimar.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        
        // Se o topo do box passou da linha gatilho, adiciona a classe 'show'
        if (boxTop < triggerBottom) {
          box.classList.add('show');
        }
      });
    };
    
    // Escuta o evento de scroll para verificar a posição dos boxes
    window.addEventListener('scroll', checkBoxes);
    
    // Roda a função uma vez no início para verificar os boxes que já estão visíveis
    checkBoxes();
  }

  // =================================================================
  // PARTE 2: FUNCIONALIDADE DE CLIQUE PARA ABRIR NOVA ABA
  // =================================================================
  // Esta parte faz os cards com o atributo 'data-href' serem clicáveis
  
  const clickableBoxes = document.querySelectorAll('.box[data-href]');
  
  clickableBoxes.forEach(box => {
    box.addEventListener('click', function() {
      // Pega a URL que está no atributo 'data-href' do HTML
      const url = this.getAttribute('data-href');
      
      // Se a URL existir, abre em uma nova aba
      if (url) {
        window.open(url, '_blank');
      }
    });
  });
});