

// "name": "Browserify",
// "desc": "Some desc",
// "src": "",
// "dest": "",
// "dependencies": [],
// "fn": "tasks/browserify",
// "alias": ["bfy","browserify"],
// "subtasks": [{
// 	"name": "Browserify:Watch",
// 	"src": "",
// 	"dependencies": ["Browserify"],
// 	"fn": "tasks/browserify"
// },{
//





module.exports = function (gulp, $) {

  var env = null;
  if ($.argv.env) {
    env = '"' + $.argv.env + '"';
  } else {
    env = '"' + typeof $.argv.env + '"';
  }
  // add custom browserify options here
  var customOpts = {
    entries: [gulp.config.angular.entry + '.js'],
    debug: false,
    insertGlobalVars: {
      ENV: function () {
        return env;
      }
    }
  };

  var opts = $.lodash.assign({
    
  }, $.watchify.args, customOpts);
  
  var b = null;
  
  if ($.argv.env !== 'production') {
    b = $.watchify($.browserify(opts));
  } else {
    b = $.browserify(opts);
  }

  b.transform([$.stringify({
    extensions: ['.hbs', '.json'],
    minify: true,
    minifier: {
      extensions: ['.html'],
      options: {
        // html-minifier options
      }
    }
  })
  ]);
  
  
  // TODO: to work with env flag
  // b.transform([$.uglifyify]);
  // b.transform([$.browserifyNgannotate]);


  //	Gulp task, define a task using orchestrator
  //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
  //	Prototype: gulp.task(name[, deps], fn)
  gulp.task(
  //	Gulp task name, define a task using orchestrator
  //	gulp#name https://github.com/gulpjs/gulp/blob/master/docs/API.md#name
  //	The name of the task. Tasks that you want to run from the command line should not have spaces in them.
    'browserify',
  //	help
  //	Type: string | boolean
    'browserify compile and optimize',
    //	gulp#deps https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
    //	Type: Array
    //	An array of tasks to be executed and completed before your task will run.
    [],
  //	gulp#fn https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn
  //	The function that performs the task's operations. Generally this takes the form of gulp.src().pipe(someplugin()).
    bundle,
    //	Gulp help, adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
    //
    //  NPM: https://www.npmjs.com/package/gulp-help
    //  Github: https://github.com/chmontgomery/gulp-help
    //
    {
      //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsaliases
      aliases: ['bfy'],
      //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsoptions
      options: {
        'env=prod': 'TODO',
        'debug': 'TODO'
      }
    }
    );

  if ($.argv.env !== 'production') {
    b.on('update', bundle);
  }
  // on any dep update, runs the bundler
  b.on('log', $.gulpUtil.log); // output build logs to terminal


  function bundle() {
    return b.bundle()
    // log errors if they happen
      .on('error', $.gulpUtil.log.bind($.gulpUtil, 'Browserify Error'))
      .pipe($.vinylSourceStream('bundle.js'))
    // optional, remove if you don't need to buffer file contents
      .pipe($.vinylBuffer())
    // optional, remove if you dont want sourcemaps
    // .pipe($.gulpSourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
      .pipe($.gulpRename(gulp.config.bundle + '.js'))
    // .pipe($.gulpGzip())
      .pipe(gulp.dest(gulp.config.dest + '/js'))
      .pipe($.browserSync.reload({
        stream: true
      }));
    //   
    //   .pipe($.gulpUglify())
    //   .on('error', $.gulpUtil.log)
    // // Add transformation tasks to the pipeline here.
    //   .pipe($.gulpSourcemaps.write('./')) // writes .map file
    //   .pipe($.gulpRename(gulp.config.bundle + '.min.js'))
    //   .pipe(gulp.dest(gulp.config.dest + '/js'));
  }



























  //
  //
  // var config = require('../config');
  // var gulpif = require('gulp-if');
  // var gutil = require('gulp-util');
  // var source = require('vinyl-source-stream');
  // var sourcemaps = require('gulp-sourcemaps');
  // var buffer = require('vinyl-buffer');
  // var streamify = require('gulp-streamify');
  // var watchify = require('watchify');
  // var browserify = require('browserify');
  // // var babelify = require('babelify');
  // var uglify = require('gulp-uglify');
  // var notify = require('gulp-notify');
  // var browserSync = require('browser-sync');
  // var browserifyShim = require('browserify-shim');
  // var debowerify = require('debowerify');
  // var deamdify = require('deamdify');
  // var exposify = require('exposify');
  // var deglobalify = require('deglobalify');
  // var ngAnnotate = require('browserify-ngannotate');
  //
  //
  //
  //
  //
  //
  // var handleErrors = function(error) {
  //
  //   if( !global.isProd ) {
  //
  //     var args = Array.prototype.slice.call(arguments);
  //
  //     // Send error to notification center with gulp-notify
  //     notify.onError({
  //       title: 'Compile Error',
  //       message: '<%= error.message %>'
  //     }).apply(this, args);
  //
  //     // Keep gulp from hanging on this task
  //     this.emit('end');
  //
  //   } else {
  //     // Log the error and stop the process
  //     // to prevent broken code from building
  //     console.log(error);
  //     process.exit(1);
  //   }
  //
  // };
  //
  //
  // function createSourcemap() {
  //   return !global.isProd || config.browserify.prodSourcemap;
  // }
  //
  // // Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
  // function buildScript(file) {
  //
  //   var bundler = browserify({
  //     entries: [config.sourceDir + 'scripts/' + file],
  //     debug: createSourcemap(),
  //     cache: {},
  //     packageCache: {},
  //     fullPaths: !global.isProd
  //   });
  //
  //   if ( !global.isProd ) {
  //     bundler = watchify(bundler);
  //
  //     bundler.on('update', function() {
  //       rebundle();
  //       gutil.log('Rebundle...');
  //     });
  //   }
  //
  //   var transforms = [
  //     // { 'name':babelify, 'options': {}},
  //     { 'name':debowerify, 'options': {}},
  //     { 'name':browserifyShim, 'options': {}},
  //     // { 'name':exposify, 'options': { "jquery": "$", "three": "THREE" }},
  //     // { 'name':deamdify, 'options': {}},
  //     // { 'name':deglobalify, 'options': {}},
  //     // { 'name':ngAnnotate, 'options': {}},
  //     // { 'name':'brfs', 'options': {}},
  //     // { 'name':'bulkify', 'options': {}}
  //   ];
  //
  //   transforms.forEach(function(transform) {
  //     bundler.transform(transform.name, transform.options);
  //   });
  //
  //   function rebundle() {
  //     var stream = bundler.bundle();
  //     var sourceMapLocation = global.isProd ? './' : '';
  //
  //     return stream.on('error', handleErrors)
  //       .pipe(source(file))
  //       .pipe(gulpif(createSourcemap(), buffer()))
  //       .pipe(gulpif(createSourcemap(), sourcemaps.init({ loadMaps: true })))
  //       .pipe(gulpif(global.isProd, streamify(uglify({
  //         compress: { drop_console: true }
  //       }))))
  //       .pipe(gulpif(createSourcemap(), sourcemaps.write(sourceMapLocation)))
  //       .pipe(gulp.dest(config.scripts.dest))
  //       .pipe(browserSync.stream());
  //   }
  //
  //   return rebundle();
  //
  // }
  //
  // gulp.task('browserify', function() {
  //
  //   return buildScript('app.js');
  //
  // });
  //
  //
































  return gulp;
};



