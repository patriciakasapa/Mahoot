let express = require('express')
let app = express();


let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('User Connected!');
        
    // socket.on('gamer-name', (gamerName) => {
    //     io.emit('gamer-name', gamerName);
    //         console.log(gamerName)
    // });

    //join game room
    socket.on('game-play-room', (roomName) => {
        socket.join(roomName);
    });

    //sending data to game room
    socket.on('game-play-data', (roomName, data) => {
        socket.join(roomName);
        socket.to(roomName).emit('game-play-data', data);
        console.log(data);
    });
    
});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});