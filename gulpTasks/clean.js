
'use strict';

module.exports = function (gulp, $) {
    // gulp.task https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
    // Define a task using Orchestrator
    // Orchestrator https://github.com/orchestrator/orchestrator
    // A module for sequencing and executing tasks and dependencies in maximum concurrency
    gulp.task('clean', 'Cleaning auto generated files except Git', [], function () {
        return gulp
            .src([gulp.config.dest + '/**/*', gulp.config.dest + '/**/!.git'], {
                // gulp https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsread
                // Do not read the file at all.
                read: false
            })
        // gulp-clean https://www.npmjs.com/package/gulp-clean
        // A gulp plugin for removing files and folders.
            .pipe($.gulpClean());
    });
    return gulp;
};
