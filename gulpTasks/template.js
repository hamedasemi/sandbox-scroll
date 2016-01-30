
module.exports = function(gulp,$) {
    //	Gulp task, define a task using orchestrator
    //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
    //	Prototype: gulp.task(name[, deps], fn)
    gulp.task(
        //	Gulp task name, define a task using orchestrator
        //	gulp#name https://github.com/gulpjs/gulp/blob/master/docs/API.md#name
        //	The name of the task. Tasks that you want to run from the command line should not have spaces in them.
        'template',
        //	help
        //	Type: string | boolean
        'template compile and optimize',
        //	gulp#deps https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
        //	Type: Array
        //	An array of tasks to be executed and completed before your task will run.
        [],
        //	gulp#fn https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn
        //	The function that performs the task's operations. Generally this takes the form of gulp.src().pipe(someplugin()).
 
 
// 
//   gulp.src('src/tpl/**/*.html')
//     .pipe(minifyHtml({empty: true, quotes: true}))
//     .pipe(ngTemplate({
//       moduleName: 'genTemplates',
//       standalone: true,
//       filePath: 'js/templates.js'
//     }))



function() {
            //	gulp#gulp.src(globs[, options]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
            //	Emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
            gulp.src(gulp.config.src + '/views/' + '*.html')
            //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
            //  NPM: https://www.npmjs.com/package/gulp-plumber
            .pipe($.gulpPlumber({
                errorHandler: gulp.onError
            }))
            //	Gulp sourcemaps, source map support for Gulp.js
            //  NPM: https://www.npmjs.com/package/gulp-sourcemaps
            .pipe($.gulpSourcemaps.init({
                debug: $.argv.debug
            }))
            //	Gulp minify css, Minify css with clean-css
            //  NPM: https://www.npmjs.com/package/gulp-minify-css
            //  Gulp if,
            //  TODO: add gulp if links to docs
            // MINIFICATION REFERENCE
            .pipe($.gulpIf($.argv.prod, $.gulpMinifyHtml({empty: true, quotes: true})))
            //	Gulp less, less plugin for gulp
            //  NPM: https://www.npmjs.com/package/gulp-ng-template
            .pipe($.gulpAngularTemplatecache({
              moduleSystem: 'IIFE',
              standalone: false,
              module: 'mcPopApp'
            }))
            //	Gulp autoprefixer, prefix CSS
            //  NPM: https://www.npmjs.com/package/gulp-autoprefixer

            //	Gulp sourcemaps, source map support for Gulp.js
            //  NPM: https://www.npmjs.com/package/gulp-sourcemaps
            .pipe($.gulpSourcemaps.write({
                debug: $.argv.debug
            }))

            //	Gulp rename, rename files
            //  NPM: https://www.npmjs.com/package/gulp-rename
            .pipe($.gulpRename(gulp.config.bundle + '.min.js'))
            //	Gulp dest, can be piped to and it will write files. Re-emits all data passed to it so you can pipe to multiple folders. Folders that don't exist will be created.
            //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options
            //  Prototype: gulp.dest(path[, options])
            .pipe(gulp.dest(gulp.config.src + '/templates'))
            //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
            //  Docs: http://www.browsersync.io/docs/api/#api-reload
            .pipe($.browserSync.reload({
                stream: true
            }));
        },
        //	Gulp help, adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
        //
        //  NPM: https://www.npmjs.com/package/gulp-help
        //  Github: https://github.com/chmontgomery/gulp-help
        //
        {
            //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsaliases
            aliases: ['css'],
            //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsoptions
            options: {
                'env=prod': 'TODO',
                'debug': 'TODO'
            }
        }
    );

    //	gulp#gulp.task
    gulp.task(
        //	gulp#name
        'less:watch',
        //	gulp#help
        'watch ".less" files and reload',
        //	gulp#deps
        ['less'],
        //	gulp#fn
        function() {
            //	gulp#gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
            //	Watch files and do something when a file changes. This always returns an EventEmitter that emits change events.
            gulp.watch(
                //	gulp#gulp.watch#glob
                //	Type: String or Array
                //	A single glob or array of globs that indicate which files to watch for changes.
                gulp.config.src.styles + '/**/*.less',
                //	gulp#gulp.watch#tasks
                //	Type: Array
                //	Names of task(s) to run when a file changes, added with gulp.task()
                ['less']
            );
        }
    );
    return gulp;
};



