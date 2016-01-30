
'use strict';

module.exports = function (gulp) {
  
    //	Configs
    gulp.config = {
        src: 'app',
        entry: 'app/layout/layout-style',
        index: 'app/layout/layout',
        dest: 'wwwroot',
        bundle: 'bundle',
        port: 9000,
        proxy: false,
        startPath: '?',
        ratio: '10/16',
        inlines: [
            'jpg',
            'jpeg'
        ],
        browsers: [
            'google chrome',
            'firefox'
        ],
        icons: {
            ext: '.css',
            name: 'glyphs'
        },
        tasks: [
            'css','js'
        ],
        angular: {
            entry: 'app/index'
        }
    };
    return gulp;
};

