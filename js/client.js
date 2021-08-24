const socket = io('http://localhost:8000');
//get dom  elements in respective js variables
const form=document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
//audio that will play on receiving messages
var audio=new Audio('ting.mp3');
//function which will append event info to the container
const append= (message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
}
//if form gets submitted send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();//page will not reload
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message)
    messageInput.value=''

});
//ask new users for his or her name and let the server know
const Name=prompt("enter  your Name to join");
socket.emit('new-user-joined', Name);//on server side function will run leads to print the message new-user-joined with name.
//if a new user joins,receive his/her name from the server
socket.on('user-joined', Name =>{
    append(`${Name} joined the chat`,'right')
});
//if server sends a message receive it
socket.on('receive', data=>{
    append(`${data.Name}:${data.message}`,'left') //receive object in the name of data
});
//if a user leaves the chat, append the info to the container 
socket.on('left', Name=>{
    append(`${Name} left the chat`,'right') //receive object in the name of data
});
