const io = require('socket.io')(5000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log(name +" joined!");
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { name: users[socket.id], message: message });
    })

    socket.on('disconnect', data => {
        let message = users[socket.id] +' left the chat!';
        socket.broadcast.emit('leave', message);
        delete users[socket.id]
    })
})