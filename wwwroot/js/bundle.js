'use strict';

System.register(['say'], function (_export, _context) {
    var say;

    function fun() {
        var name = 'bootstrap';
        console.log(say.say + ' from ' + name);
    }

    return {
        setters: [function (_say) {
            say = _say;
        }],
        execute: function () {
            fun();
        }
    };
});
'use strict';

System.register([], function (_export, _context) {
    return {
        setters: [],
        execute: function () {
            function say() {
                return 'hello';
            }

            _export('say', say);
        }
    };
});