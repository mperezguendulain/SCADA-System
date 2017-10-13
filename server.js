var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const SerialPort = require('serialport');

http.listen(8080);
app.use(express.static('public'));


// Serial Port
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

const port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});
port.pipe(parser);

port.on('open', () => console.log('Port open'));
parser.on('data', (trama) => {
    // console.log(dato);
    io.emit('trama', trama);
});



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('ledDig-power', (json_data) => {
        port.write("n"+json_data.color+json_data.valor);
    });
    socket.on('ledPwm', (json_data) => {
        port.write("p"+json_data.color+json_data.valor);
        console.log(json_data);
    });
});
