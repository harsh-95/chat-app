const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./router');

const app = express();

const PORT = process.env.PORT || 3001;

app.set('port' , PORT);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection',(socket)=>{
    console.log('socket connected');
    socket.on('disconnet', ()=>{
        console.log('User left the server');
    });
});

app.use(routes);

server.listen(PORT, ()=>{console.log('server is running')});
