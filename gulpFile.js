
/**
 * Node.js® 
 * Manual & Documentation https://nodejs.org/docs/latest/api/
 * 
 * Node.js® Built in modules https://nodejs.org/api/
 * 
 * Path https://nodejs.org/docs/latest/api/path.html
 * OS https://nodejs.org/docs/latest/api/os.html
 * FS https://nodejs.org/docs/latest/api/fs.html
 * 
 * async https://www.npmjs.com/package/async
 * minimist https://www.npmjs.com/package/minimist
 * 
 */


/**
 * JavaScript API
 * 
 * JavaScript Use Strict http://www.w3schools.com/js/js_strict.asp
 * JavaScript try/catch/finally Statement http://www.w3schools.com/jsref/jsref_try_catch.asp
 * JavaScript throw https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
 */
'use strict';

/**
 * Gulp
 * The streaming build system
 * 
 * Website: http://gulpjs.com/
 * Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md
 * 
 * https://www.npmjs.com/package/run-sequence
 * 
 * gulp-util https://www.npmjs.com/package/gulp-util
 * gulp-load-plugins https://www.npmjs.com/package/gulp-load-plugins
 * gulp-help https://www.npmjs.com/package/gulp-help
 * gulp.task https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
 * 
 * gulp-bump https://www.npmjs.com/package/gulp-bump
 * gulp-git https://www.npmjs.com/package/gulp-git
 * gulp-inject https://www.npmjs.com/package/gulp-inject
 * 
 */
var gulp = require('gulp');

gulp = require('./gulpConfig')(gulp);
gulp = require('gulp-help')(gulp, {
  hideEmpty: true
});

/**
 * Automatically lazy load dependencies in package.json seleceted scope
 */
var $ = require('gulp-load-plugins')({
  pattern: ['*'],
  replaceString: /^(|\.)/,
  scope: ['devDependencies'],
  lazy: true
});

$.path = require('path');
$.os = require('os');
$.fs = require('fs');

/**
 * Parse argument options https://www.npmjs.com/package/minimist
 * opts.boolean: string or array of strings to always treat as booleans.
 */
$.argv = $.minimist(process.argv.slice(2), { 
    boolean: ['ghost', 'info', 'debug', 'sync', 'online', 'port', 'https', 'server', 'proxy', 'xip']
});

try {
  var tasks = gulp.config.tasks;
  /**
   * Asynchronously load gulp tasks using https://www.npmjs.com/package/async
   * Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. 
   */
  $.async.map(tasks, function (file) {
    gulp = require('./gulpTasks/' + file)(gulp, $);
  });
} catch (err) {
  throw err;
} finally {

}

gulp.onError = function (error) {
  $.gulpUtil.beep();
  if (error) {
    $.gulpUtil.log($.gulpUtil.colors.red(error));
  }
}

gulp.task('default', ['help']);

gulp.task('dev', function (cb) {
    $.runSequence(
        ['copy:watch', 'handlebars:watch', 'browserify', 'stylus:watch'],
        'browser',
    cb);
});

gulp.task('prod', function (cb) {
    $.runSequence(
        ['icon', 'font', 'phrase:get:locale', 'favicon'],
        ['copy', 'handlebars', 'browserify', 'stylus'],
    cb);
});
