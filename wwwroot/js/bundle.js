(function () {
   
    
    var debugInfo = $('debug-info');
    
    var doc = $(document);
    var body = $('body');
    var win = $(window);
    
    var verseList = $('.verse');
    
    
    verseList.each(function(index){
        var verse = $(this);
        
        var position = verse.position();
        
        console.log(position.top);
    });
    
    // win.on('touchstart', function(event){
    //     event.preventDefault();
    //     iio.log('touch start');
    //     win.on('touchmove', function(event){
    //         iio.log('touch move');
    //         iio.log(event.originalEvent.touches[0].pageX);
    //     });
    // });
    

    win.on('mousewheel', touchMove);
    var viewport = win.height();
    var wheel = 0;
    var verse = $('.verse');
    var firstVerse = $('.verse').first();
    function touchMove(event, delta) {
        var position = verse.offset();
        var bodyPosition = body.offset();
        
        debugInfo.prepend('[book][verse-position-top]', position.top, '<br>');
        debugInfo.prepend('[book][body-position-top]', bodyPosition.top, '<br>');
        debugInfo.prepend('[book][window-height]', viewport, '<br>');
        debugInfo.prepend('[book][doc-height]', doc.height(), '<br>');
        
        var currentMatrix = verse.css('transform').split('(')[1].split(')')[0].split(', ');
        var currentPosition = parseInt(currentMatrix[4]);
        
        wheel = wheel + currentPosition + Math.floor(event.originalEvent.wheelDelta);
        
        // verse.css('transform', 'translateZ('+wheel/-2+'px) translateY('+ wheel +'px) rotateX('+ wheel +'deg)');
        verse.css('transform', 'translateY('+ wheel*-1 +'px)');
        firstVerse.css('transform', 'rotateX('+ wheel*.9 +'deg) translateY('+ wheel*-1.1 +'px)');
        
        console.log('[book][touch-move]', wheel);
        
    }
    

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