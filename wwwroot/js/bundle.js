(function () {

    var $ = window.$;
// 
//     var win = $('body');
//     var verses = $('#verses');
// 
//     win.on('touchstart', touchStart);
//     function touchStart(event) {
//         event.preventDefault();
//         console.log('touch start');
//         
//         // event.targetTouches[0].target.style.webkitTransform
//     }
//     var currentMatrix = verses.css('transform').split('(')[1].split(')')[0].split(', ');
//     var currentPosition = parseInt(currentMatrix[5]);
//     var offset = event.originalEvent.touches[0].pageY;


    document.addEventListener('touchmove', touchMove);
    function touchMove(event) {
        event.preventDefault();
        console.log(event.changedTouches[0].pageY);
        console.log(event.targetTouches[0].screenY);
        console.log(event.touches[0].pageY);
        console.log('pageY', event.targetTouches[0].pageY);
//         console.log('pageY', event.targetTouches[0].pageY); 
//         // 
//         var moveTo = 'translateY(' + (currentPosition + event.targetTouches[0].pageY - offset) + 'px)';
//         // console.log('moveTo: ', moveTo); 
//         // var moveTo = 'translate(' + (currentPosition + ((event.clientX) - offset)) + 'px)';
// 
//         // self.css('transform', moveTo);
//         // itemsTwins.css('transform', moveTo);
//         verses.css('-webkit-transform', moveTo);

    };

} ());
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