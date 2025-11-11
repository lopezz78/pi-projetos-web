// Espera o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('Senha');
    const confirmarSenhaInput = document.getElementById('ConfirmarSenha');
    const toggleSenhaBtn = document.getElementById('toggleSenha');
    const toggleConfirmarSenhaBtn = document.getElementById('toggleConfirmarSenha');
    const mensagemErro = document.getElementById('mensagemErroSenha');

    /**
     * Função para mostrar ou ocultar a senha
     * @param {HTMLInputElement} input - O campo de input da senha
     * @param {HTMLButtonElement} button - O botão que foi clicado
     */
    function togglePasswordVisibility(input, button) {
        const icon = button.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'bi bi-eye';
        } else {
            input.type = 'password';
            icon.className = 'bi bi-eye-slash-fill';
        }
    }

    // Adiciona o evento de clique para os botões
    toggleSenhaBtn.addEventListener('click', function() {
        togglePasswordVisibility(senhaInput, this);
    });

    toggleConfirmarSenhaBtn.addEventListener('click', function() {
        togglePasswordVisibility(confirmarSenhaInput, this);
    });

    /* Função para validar se as senhas são iguais*/
    function validarSenhas() {
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        // Se o campo de confirmação não está vazio e as senhas são diferentes
        if (confirmarSenha && senha !== confirmarSenha) {
            mensagemErro.textContent = 'As senhas não coincidem.';
            confirmarSenhaInput.style.borderColor = '#E53E3E'; // Borda vermelha
            return false; // Indica que a validação falhou
        } else {
            mensagemErro.textContent = ''; // Limpa a mensagem de erro
            confirmarSenhaInput.style.borderColor = ''; // Volta à cor original do CSS
            return true; // Indica que a validação passou
        }
    }

    // Adiciona eventos para validar as senhas em tempo real enquanto o usuário digita
    senhaInput.addEventListener('keyup', validarSenhas);
    confirmarSenhaInput.addEventListener('keyup', validarSenhas);

    /**
     * Validação final antes de enviar o formulário
     */
    document.querySelector('form').addEventListener('submit', function(event) {
        // Se a função validarSenhas retornar false, impede o envio do formulário
        if (!validarSenhas()) {
            event.preventDefault(); // Previne o comportamento padrão (enviar o form)
            alert('Por favor, corrija os erros no formulário antes de continuar.');
        }
    });
});