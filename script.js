// Подключение к WebSocket-серверу по адресу 'ws://localhost:8080'
const socket = new WebSocket('ws://localhost:8080');

// Получаем элементы формы и поля ввода
const form = document.getElementById('form');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

// Обработка событий WebSocket

// Соединение установлено
socket.onopen = function () {
    console.log('Соединение с WebSocket сервером установлено.');
};

// Получение сообщения от сервера
socket.onmessage = function (event) {
    const data = JSON.parse(event.data); // Парсим полученные данные как JSON
    displayMessage(data.text); // Отображаем полученное сообщение
};

// Соединение закрыто
socket.onclose = function () {
    console.log('Соединение с WebSocket сервером закрыто.');
};

// Обработка ошибки WebSocket
socket.onerror = function (error) {
    console.error('Ошибка WebSocket:', error);
};

// Обработка отправки сообщения
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Отключаем перезагрузку страницы при отправке формы
    const message = messageInput.value.trim(); // Очищаем лишние пробелы

    if (message && socket.readyState === WebSocket.OPEN) {
        // Отправляем сообщение в формате JSON
        socket.send(JSON.stringify({ text: message }));
        displayMessage(message, true);
        messageInput.value = ''; // Очищаем поле ввода
    }
});

function displayMessage(message, isOwnMessage = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__message');

    if (isOwnMessage) {
        // Если это сообщение отправлено вами, добавляем тег <strong> для выделения слова "Вы:"
        messageElement.innerHTML = `<strong>Вы:</strong> ${message}`;
    } else {
        messageElement.textContent = message; // Для сообщений от других пользователей
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}