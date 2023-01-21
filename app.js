const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("pos", (msg) =>{
        console.log(`position : ${msg}`)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});

app.use(express.static('public'))