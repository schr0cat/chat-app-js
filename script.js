document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messages');

    // Обработчик события отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const messageText = messageInput.value.trim(); // Получаем текст сообщения

        if (messageText) {
            // Создаем элемент для сообщения
            const messageElement = document.createElement('div');
            messageElement.className = 'chat__message';
            messageElement.textContent = messageText; // Устанавливаем текст сообщения

            messagesContainer.appendChild(messageElement); // Добавляем сообщение в контейнер

            messageInput.value = ''; // Очищаем поле ввода
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокручиваем вниз
        }
    });
});