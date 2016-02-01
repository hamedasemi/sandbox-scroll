'use strict';

System.register(['say.js'], function (_export, _context) {
    var say;

    function fun() {
        var name = 'bootstrap';
        console.log(say.say + ' from ' + name);
    }

    return {
        setters: [function (_sayJs) {
            say = _sayJs;
        }],
        execute: function () {
            fun();
        }
    };
});