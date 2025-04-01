// Este arquivo contém a lógica para manipulação de formulários de cadastro e login.

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');
    const clearPhotoButton = document.getElementById('clear-photo');
    const profilePhotoInput = document.getElementById('profile-photo');
    const clearResumeButton = document.getElementById('clear-resume');
    const resumeInput = document.getElementById('resume');

    // Verifica se o usuário está autenticado
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    // Lógica para o formulário de cadastro
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html'; // Redireciona para a página de login
        });
    }

    // Lógica para o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Simula autenticação bem-sucedida
            alert('Login realizado com sucesso!');
            sessionStorage.setItem('isAuthenticated', 'true'); // Marca o usuário como autenticado

            // Redireciona para a página inicial ou outra página
            window.location.href = 'registration.html'; // Ajuste conforme necessário
        });
    }

    // Alternar visibilidade da senha
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', () => {
            const isPasswordVisible = passwordInput.type === 'password';
            passwordInput.type = isPasswordVisible ? 'text' : 'password';
            togglePasswordButton.textContent = isPasswordVisible ? '🙈' : '👁️';
        });
    }

    // Alternar visibilidade da confirmação de senha
    if (toggleConfirmPasswordButton) {
        toggleConfirmPasswordButton.addEventListener('click', () => {
            const isConfirmPasswordVisible = confirmPasswordInput.type === 'password';
            confirmPasswordInput.type = isConfirmPasswordVisible ? 'text' : 'password';
            toggleConfirmPasswordButton.textContent = isConfirmPasswordVisible ? '🙈' : '👁️';
        });
    }

    // Validação personalizada para o campo de senha
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!passwordPattern.test(password)) {
                passwordInput.setCustomValidity(
                    "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 número."
                );
            } else {
                passwordInput.setCustomValidity('');
            }
        });
    }

    // Validação para o campo de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
        });
    }

    // Lógica para limpar a foto de perfil
    if (clearPhotoButton && profilePhotoInput) {
        clearPhotoButton.addEventListener('click', () => {
            profilePhotoInput.value = ''; // Limpa o valor do campo de upload
            alert('Imagem apagada com sucesso!');
        });
    }

    // Lógica para limpar o currículo ou certificado
    if (clearResumeButton && resumeInput) {
        clearResumeButton.addEventListener('click', () => {
            resumeInput.value = ''; // Limpa o valor do campo de upload
            alert('Arquivo de currículo ou certificado apagado com sucesso!');
        });
    }
});