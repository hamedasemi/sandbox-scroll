(function () {
    var $ = window.$;
    var iio = window.iio;
    iio.log('[red]', 'started');
    
    var debugInfo = $('debug-info');
    
    var doc = $(document);
    var body = $('body');
    var win = $(window);
    
    var verseList = $('.verse');
    
    
    verseList.each(function(index){
        var verse = $(this);
        
        var position = verse.position();
        
        iio.log(position.top);
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
    var verse = $('.verse').first();
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
        
        verse.css('transform', 'translateY('+ wheel +'px');
        
        iio.log('[book][touch-move]', wheel);
        
    }
    

} ());