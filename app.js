const Room = require('./room');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = 3000;
let locations = {};
let rooms = [];
setInterval(function () {
    for (let room of rooms) {
        io.to(room.socketRoom).emit('update', room.update());
    }
}, 40);
io.on('connection', (socket) => {
    console.log(`a user connected with id: ${socket.id}`);

    let newRoom = new Room.Room(socket.id);
    rooms.push(newRoom);
    locations[socket.id] = newRoom;
    newRoom.addPlayer(socket.id);
    io.to(socket.id).emit('assigned_number', [
        newRoom.ids[socket.id]['number'],
        newRoom.code,
    ]);

    socket.on('pos', (msg) => {
        locations[socket.id].ids[socket.id].target = msg;
    });

    socket.on('join', (msg) => {
        let destination = rooms.find((room) => room.code === parseInt(msg));
        if (destination && destination.addPlayer(socket.id)) {
            locations[socket.id].removePlayer(socket.id);
            socket.join(destination.socketRoom);
            locations[socket.id] = destination;
            io.to(socket.id).emit('assigned_number', [
                destination.ids[socket.id]['number'],
                destination.code,
            ]);
        }
    });

    socket.on('kpos', (msg) => {
        let room = locations[socket.id];
        if (room && socket.id in room.ids) {
            room.ids[socket.id].kangle = msg.angle;
            room.ids[socket.id].kx = room.ids[socket.id].x;
            room.ids[socket.id].ky = room.ids[socket.id].y;
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        locations[socket.id].removePlayer(socket.id);
        if (locations[socket.id].numPlayers() === 0) {
            delete locations[socket.id];
            rooms = rooms.filter(
                (room) =>
                    room.socketRoom !== socket.id && room.numPlayers() === 0
            );
        }
    });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});

app.use(express.static('public'));
