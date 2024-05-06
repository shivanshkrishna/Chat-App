
const socket = io('http://localhost:10000');

const form = document.getElementById('send-container')

const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3')


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    if (position == 'left') {
        audio.play();
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = " "
})



const name = prompt("Enter Your Name To Join")
socket.emit('new-user-joined', name)



socket.on('user-joined', data => {
    append(`${name} joined the chat`, 'left')
})



socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left')
})


socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})

