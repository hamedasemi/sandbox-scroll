(function () {

    var $ = window.$;
// 
//     var win = $('body');
    var verses = $('#verses');
// 
//     win.on('touchstart', touchStart);
//     function touchStart(event) {
//         event.preventDefault();
//         console.log('touch start');
//         
//         // event.targetTouches[0].target.style.webkitTransform
//     }
    var currentMatrix = verses.css('transform').split('(')[1].split(')')[0].split(', ');
    var currentPosition = parseInt(currentMatrix[5]);
    // var offset = event.originalEvent.targetTouches[0].pageY;


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






// 
// (function () {
// var swipeY = 0;
// 
// function onTouchMove( event ) {
// 
//     var scroll = event.target.closestByClassName( 'scroll' );
// 
//     if ( scroll ) {
// 
//         var top = scroll.positionTop - scroll.parentNode.positionTop,
//             heightDifference = ( 0 - scroll.offsetHeight + scroll.parentNode.offsetHeight );
// 
//         if( ( top >= 0 ) && ( event.touches[0].screenY > swipeY ) ) { 
//             event.preventDefault(); //at top, swiping down
//         } else if( ( top <= heightDifference ) && ( event.touches[0].screenY < swipeY ) ) { 
//             event.preventDefault(); //at bottom, swiping up
//         };
// 
//     } else {
//         event.preventDefault();
//     };
// 
// };
// 
// function onTouchStart( event ) {
// 
//     swipeY = event.touches[0].screenY;
// 
// };
// 
// Element.prototype.closestByClassName = function ( className ) {
// 
//     return this.className && this.className.split( ' ' ).indexOf( className ) > -1
//         ? this
//         : ( this.parentNode.closestByClassName && this.parentNode.closestByClassName( className ) );
// 
// };
// 
// window.Object.defineProperty( Element.prototype, 'positionTop', {
// 
//     get: function () { 
//         return this.offsetTop - this.parentNode.scrollTop;
//     }
// 
// } );
// 
// document.getElementById( 'viewport' ).addEventListener( 'touchmove', onTouchMove, false );
// document.getElementById( 'viewport' ).addEventListener( 'touchstart', onTouchStart, false );
// 
// 
// } ());