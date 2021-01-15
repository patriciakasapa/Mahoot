//Install express server
const express = require('express');
const path = require('path');

const app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('User Connected!');

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

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/angularapp'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/angularapp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

//websocket server
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});