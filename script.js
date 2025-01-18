// Adiciona o evento de envio do formulário
document.getElementById('contato-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Obtendo os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Elementos de feedback
    const feedbackNome = document.getElementById('feedback-nome');
    const feedbackEmail = document.getElementById('feedback-email');
    const feedbackMensagem = document.getElementById('feedback-mensagem');

    // Limpando os feedbacks anteriores
    limparFeedback([feedbackNome, feedbackEmail, feedbackMensagem]);

    // Validação dos campos
    let formIsValid = validarCampos(nome, email, mensagem, feedbackNome, feedbackEmail, feedbackMensagem);

    // Se o formulário for válido, envia o e-mail
    if (formIsValid) {
        alert(`Obrigado pela sua mensagem, ${nome}! Entraremos em contato em breve.`);
        enviarEmail(nome, email, mensagem);
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Função para limpar os feedbacks
function limparFeedback(feedbacks) {
    feedbacks.forEach(feedback => feedback.textContent = '');
}

// Função para validar os campos
function validarCampos(nome, email, mensagem, feedbackNome, feedbackEmail, feedbackMensagem) {
    let formIsValid = true;

    // Validação de nome
    if (!nome) {
        feedbackNome.textContent = 'Por favor, insira seu nome.';
        feedbackNome.style.color = 'red';
        formIsValid = false;
    }

    // Validação de e-mail
    if (!email || !validarEmail(email)) {
        feedbackEmail.textContent = 'Por favor, insira um e-mail válido.';
        feedbackEmail.style.color = 'red';
        formIsValid = false;
    }

    // Validação de mensagem
    if (!mensagem) {
        feedbackMensagem.textContent = 'Por favor, insira uma mensagem.';
        feedbackMensagem.style.color = 'red';
        formIsValid = false;
    }

    return formIsValid;
}

// Função para validar o formato do e-mail
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Função para enviar o e-mail com o EmailJS
function enviarEmail(nome, email, mensagem) {
    emailjs.init("YOUR_USER_ID"); // Inicialize o EmailJS com seu User ID

    const templateParams = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(function (response) {
            console.log("E-mail enviado com sucesso!", response);
            alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
        }, function (error) {
            console.error("Erro ao enviar e-mail:", error);
            alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
        });
}

// JavaScript para alternar o menu hamburguer
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Função para alternar entre expandir e recolher a biografia
function toggleBio(id) {
    const bio = document.getElementById(id);

    // Verificar se a biografia está visível
    if (bio.style.display === 'none' || bio.style.display === '') {
        bio.style.display = 'block'; // Exibe a biografia
    } else {
        bio.style.display = 'none'; // Oculta a biografia
    }
}

let currentIndex = 0;

function moveSlide(step) {
    const images = document.querySelectorAll('.galeria-imagem');
    const totalImages = images.length;

    currentIndex += step;
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 33.33; // Ajuste para 3 imagens
    document.querySelector('.galeria-carousel').style.transform = `translateX(${offset}%)`;
}

