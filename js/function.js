const themeSwitch = document.getElementById('themeSwitch');

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeSwitch.addEventListener('click', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const form = document.getElementById('feedbackForm');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const categoryInput = document.getElementById('category');
const messageInput = document.getElementById('message');
const modal = document.getElementById('contactModal');

if (emailInput) emailInput.addEventListener('input', validateEmail);
if (nameInput) nameInput.addEventListener('input', validateName);
if (phoneInput) phoneInput.addEventListener('input', validatePhone);
if (categoryInput) categoryInput.addEventListener('change', validateCategory);
if (messageInput) messageInput.addEventListener('input', validateMessage);

function validateEmail() {
    const emailRegex = /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/;
    if(emailRegex.test(emailInput.value.trim())){
        removeError(emailInput);  
        return true;
    }
    else{
        showError(emailInput, "Email не соответствует формату. Пример: ivanov@mail.ru");
        return false;
    }
}

function validateName() {
    const nameRegex = /^[А-ЯЁ][а-яё]{1,}(?:[- ][А-ЯЁ][а-яё]{1,}){0,2}$/;
    if(nameRegex.test(nameInput.value.trim())){
        removeError(nameInput);  
        return true;
    }
    else{
        showError(nameInput, "ФИО не соответствует формату. Пример: Иванов Иван Иванович");
        return false;
    }
}

function validatePhone() {
    const phoneRegex = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if(phoneRegex.test(phoneInput.value.trim())){
        removeError(phoneInput);  
        return true;
    }
    else{
        showError(phoneInput, "Номер телефона не соответствует формату. Пример: +7(123)456-78-90");
        return false;
    }
}

function validateCategory() {
    if(categoryInput.value){
        removeError(categoryInput);  
        return true;
    }
    else{
        showError(categoryInput, "Выберите категорию обращения");
        return false;
    }
}

// Валидация сообщения
function validateMessage() {
    const message = messageInput.value.trim();
    if(message.length >= 10){
        removeError(messageInput);  
        return true;
    }
    else{
        showError(messageInput, "Сообщение должно содержать минимум 10 символов");
        return false;
    }
}

function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error') || document.createElement('div');

    errorElement.className = 'error';
    errorElement.textContent = message;
    
    if (!formControl.querySelector('.error')) {
        formControl.appendChild(errorElement);
    }
    
    input.style.borderColor = '#e53e3e';
}

function removeError(input) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error');

    if(errorElement){
        formControl.removeChild(errorElement);
    }

    input.style.borderColor = '#38a169';
}

function submitForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isCategoryValid = validateCategory();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isCategoryValid || !isMessageValid) {
        alert('Пожалуйста, исправьте ошибки в форме перед отправкой');
        return;
    }

    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
    closeModal();
}

function closeModal() {
    const dialog = document.getElementById('contactModal');
    dialog.close();
    clearErrors();
    if (form) form.reset();
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.remove());
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.style.borderColor = '';
    });
}

document.getElementById('contactModal').addEventListener('click', function (event) {
    if (event.target === this) {
        this.close();
    }
});

document.getElementById('feedbackForm').addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && event.target.type !== 'textarea') {
        event.preventDefault();
    }
});