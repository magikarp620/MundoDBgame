const Room = require('./room');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = 3000;
const room = new Room.Room();
let update = false;
io.on('connection', (socket) => {
    let interval;
    if (!update) {
        interval = setInterval(() => {
            io.emit('update', room.update());
        }, 40);
        update = true;
    }
    console.log(`a user connected with id: ${socket.id}`);
    if (!room.addPlayer(socket.id)) {
        console.log('room full');
    } else {
        io.to(socket.id).emit('assigned_number', [
            room.ids[socket.id]['number'],
            room.code,
        ]);
    }
    console.log(room.numPlayers());
    socket.on('pos', (msg) => {
        if (socket.id in room.ids) {
            room.ids[socket.id].target = msg;
        }
    });
    socket.on('join', (msg) => {
        console.log(`socket ${socket.id} wants to join ${msg}`);
    });
    socket.on('kpos', (msg) => {
        if (socket.id in room.ids) {
            room.ids[socket.id].kangle = msg.angle;
            room.ids[socket.id].kx = room.ids[socket.id].x;
            room.ids[socket.id].ky = room.ids[socket.id].y;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        room.removePlayer(socket.id);
        console.log(room.numPlayers());
        if (room.numPlayers() === 0) {
            clearInterval(interval);
            update = false;
        }
    });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});

app.use(express.static('public'));
