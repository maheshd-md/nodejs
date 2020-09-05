const socket = io('http://localhost:5000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');

const name = prompt('Enter your name: ');

socket.emit('new-user-joined', name);

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

socket.on('user-joined', name => {
    append(`${name} joined chat group!!`, 'left');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', message => {
    append(message, 'left');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(message, 'right');
    socket.emit('send', message);
    messageInput.value = '';
}) 
