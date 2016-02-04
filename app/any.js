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