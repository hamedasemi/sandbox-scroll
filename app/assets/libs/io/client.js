(function () {

    var socket = io('http://' + document.location.hostname + ':5000/debug.io/');
    var title = 'IO';
    var ip = '0.0.0.0';
    var originalConsoleLog = console.log;

    socket.emit('connection');

    console.log = function () {
        var date = 'A date';
        socket.emit('log', arguments);
        var args = [].slice.call(arguments);
        args.unshift('[' + title + ' ' + ip.gray + ' ' + date + ']');
        // args.unshift('%c[IO]%c[' + new Date().toTimeString('HH:mm:ss').replace(/\ .+/, '') + ']','padding: 3px; background: #111; color: green','padding: 3px; background: #111; color: gray');
        // '%c['+this.title+'][log]','color: MediumSeaGreen' SteelBlue tomato red
        originalConsoleLog.apply(console, args);
    };

    socket.on('config', function (config) {
        var search = window.location.search;
        if (config.debug === 'remote' || search.match(/debug=remote/g)) {
            title = 'IO';
        } else if (config.debug || search.match(/debug/g)) {
            title = 'DEBUG';
        } else {
        }
    });
            
    document.addEventListener('click', clickHandler);
    
    function clickHandler(event){
        console.log(event, 'my event');
    }
})();