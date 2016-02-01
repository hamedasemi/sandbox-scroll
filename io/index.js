
var server = require('http').createServer();
server.listen(5000);

var io = require('socket.io')(server);
var c = require('chalk');

var iio = io.of('/iio/');

// https://www.npmjs.com/package/colors
// http://socket.io/docs/server-api/

iio.log = function log(logs){
    console.log( c.blue('[iio]'),
    c.gray('['+new Date().toTimeString("HH:mm:ss").replace(/\ .+/, '')+']')
    , logs );
};

iio.on('connection', function (socket) {
    iio.log('A new connection stablized.');
    
    iio.emit('new connection', 'Emit all the clients every time a new connection established.');
    
    iio.log(c.blue('[iio]'), 'emit new connection', 'with id:', socket.id);
    
    this.debug = {
        depth: 'components',
        type: 'broadcast',
        level: 'info'
    };
    
    socket.emit('config', this.debug);
    iio.log(c.blue('[iio]'), 'socket emit config', this.debug);
    
    socket.emit('debug type', 'private clicked');
    
    iio.log("ip: " + socket.request.connection.remoteAddress);
    iio.log("user-agent: " + socket.request.headers['user-agent']);

    socket.on('log', function (data) {
        iio.log(data);
        // socket.broadcast.emit('log', 'log message');
    });
    
    socket.on('clicked', function (data) {
        console.log(c.blue(data), 'Not colored');
        socket.emit('log', 'private clicked');
        socket.broadcast.emit('log', 'log clicked');
    });
    
});
