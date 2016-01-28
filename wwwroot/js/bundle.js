(function () {
    var $ = window.$;
    console.log('[red]', 'started');
    
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
        
        debugInfo.append('[book][touch-move]', wheel);
        
    }
    

} ());
(function () {
    var $ = window.$;
    console.log('[rrrr]', 'started');
    

} ());