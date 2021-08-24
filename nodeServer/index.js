

//Node server which will handle socket io connections
 const io = require('socket.io')(8000,{
    cors:{
        origin:'*',

    }
});//this is to export socket io module which provide two way communication between server and client
//socket.io server will listen incoming invents 
//it is an instance of http
const users= {};
io.on('connection', socket=>{//it is a socket.io instance it will list all the socket.io connection for ex kaif connect friends connect..
//if any users joined let other users connected to the server know
socket.on('new-user-joined',Name=>{//what should done with particular connection it will handle by socket.on
    //as the new-user-joined it will append the name in users socket.id
   // console.log("New user", Name);
users[socket.id]=Name;
socket.broadcast.emit('user-joined',Name);//when any user-joined it will append name in users and broadcast.emit will inform everyone by using
//an event user-joined to everyone eccept the user who is joined.
});
socket.on('send',message=>{//if send event performs it means it will receive by everyone
    socket.broadcast.emit('receive', {message: message,Name: users[socket.id]});//receive event means broadcast.emit will inform everyone to receive the message and tell everyone with name and message who sent it.




});
socket.on('disconnect',message =>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];

});
});