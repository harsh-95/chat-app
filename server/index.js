const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./router');
const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const app = express();

const PORT = process.env.PORT || 3001;

app.set('port' , PORT);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection',(socket)=>{
    console.log('socket connected');

    socket.on('join', ({name, room}, callback)=>{
        const {user, error} = addUser({id: socket.id, name, room});

        if(error){
            return callback(error);
        }

        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} has joined`});
        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    });

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
        }
    });
});

app.use(routes);

server.listen(PORT, ()=>{console.log('server is running')});
