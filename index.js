let express = require('express')
let app = express();

var cors = require('cors')
app.use(cors());

let http = require('http');
let server = http.Server(app);


let socketIO = require('socket.io');

let io = socketIO(server, {
    
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
          "Access-Control-Allow-Headers": "my-custom-header",
          "Access-Control-Allow-Credentials": true
        });
        res.end();
      }
    }
    );

const port = process.env.PORT || 5000;


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
        socket.to(roomName).emit('scoreboard', data);
    });
    
});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
