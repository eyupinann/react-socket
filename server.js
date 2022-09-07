const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var port = 3001

app.get('/',function (req, res)  {
    res.send('lorem ipsum dolor sit amet.');
});

io.on('connection', function (socket)  {
    console.log('conn');
    socket.on('send_data',(data)=>{
        socket.broadcast.emit('push_data',{url:data.url})
    })
});

server.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
});
