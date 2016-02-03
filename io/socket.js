
/**
 * Debug.io
 * 
 * https://www.npmjs.com/package/colors
 * http://socket.io/docs/server-api
 * 
 */

var colors = require('colors');
var io = require('socket.io')(5000);
var IO = io.of('/debug.io/');

IO.on('connection', function (socket) {

    var title = 'IO';
    var ua = require('ua-parser').parse(socket.request.headers['user-agent']);
    var os = ua.os.toString();
    var browser = ua.toString();
    var device = ua.device.family;
    var ip = socket.request.connection.remoteAddress.split('::ffff:')[1];

    console.log.io = function () {
        var date = new Date().toTimeString('HH:mm:ss').replace(/\ .+/, '').cyan;
        var args = [].slice.call(arguments);
        args.unshift('['.cyan + title.cyan + ' ' + ip.gray + ' ' + date.cyan + ']'.cyan);
        console.log.apply(console, args);
    };

    console.log.io('[Browser]'.cyan, browser.gray);
    console.log.io('[OS]'.cyan, os.gray);
    console.log.io('[Ip]'.cyan, ip.gray);
    console.log.io('[Device]'.cyan, device.gray);

    socket.emit('config', {
        debug: process.env.npm_config_debug,
        depth: process.env.npm_config_depth,
        type: process.env.npm_config_type,
        level: process.env.npm_config_level
    });

    socket.on('log', function (data) {
        data = JSON.stringify(data).replace(/\n$/, '');
        console.log.io(data);
    });
});
