

//	Gulp load plugins, automatically load any gulp plugins in your package.json
//  NPM: https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')({
	pattern: ['*'],
    replaceString: /^(|\.)/,
    scope: ['devDependencies','nodeDevDependencies'],
    lazy: true
});

var $$ = require('./../package.json').config;

module.exports = function(gulp) {


    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');

    gulp.task('mocha', function() {
        return gulp.src(['test/*.js'], { read: false })
            .pipe(mocha({ reporter: 'list' }))
            .on('error', gutil.log);
    });

    gulp.task('watch-mocha', function() {
        gulp.watch(['lib/**', 'test/**'], ['mocha']);
    });


    return gulp;
};



