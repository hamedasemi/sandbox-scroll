
//
// "font": {
// 	"src": "/assets/fonts/**/*.{ttf,otf}",
// 	"ext": ".less",
// 	"fontface": "app/assets/fonts",
// 	"relative": "/assets/fonts",
// 	"dest": "www/assets/fonts",
// 	"embed": [
// 		"woff"
// 	],
// 	"collate": false
// },
// "icons": {
// 	"ext": ".less",
// 	"name": "glyphs"
// }

module.exports = function (gulp, $) {
  // Tasks
  gulp.task('icon', [], function () {
    var runTimestamp = Math.round(Date.now() / 1000);
    gulp.src(gulp.config.src + '/assets/icons/*.sketch')
      .pipe($.gulpPlumber())
      .pipe($.gulpSketch({
        export: 'artboards',
        formats: 'svg'
      }))
      .pipe($.gulpIconfont({
        fontName: gulp.config.icons.name,
        appendUnicode: false,
        centerHorizontally: false,
        normalize: true,
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        timestamp: runTimestamp,
        log: $.argv.debug
      }))
      .on('glyphs', function (glyphs) {
        var options = {
          glyphs: glyphs,
          fontName: gulp.config.icons.name,
          fontPath: '',
          className: 'glyph'
        };
        gulp.src(gulp.config.src + '/assets/icons/templates/template.css')
          .pipe($.gulpPlumber())
          .pipe($.gulpConsolidate('lodash', options))
          .pipe($.gulpRename({
            basename: gulp.config.icons.name
          }))
          .pipe(gulp.dest(gulp.config.src + '/assets/icons/preview'));
        gulp.src(gulp.config.src + '/assets/icons/templates/template' + gulp.config.icons.ext)
          .pipe($.gulpPlumber())
          .pipe($.gulpConsolidate('lodash', options))
          .pipe($.gulpRename({
            basename: gulp.config.icons.name + '-classes'
          }))
          .pipe(gulp.dest(gulp.config.src + '/assets/icons'));
        gulp.src(gulp.config.src + '/assets/icons/templates/template.html')
          .pipe($.gulpPlumber())
          .pipe($.gulpConsolidate('lodash', options))
          .pipe($.gulpRename({
            basename: 'index'
          }))
          .pipe(gulp.dest(gulp.config.src + '/assets/icons/preview'));
      })
      .pipe(gulp.dest(gulp.config.src + '/assets/icons/preview'))
      .pipe($.gulpFilter(['*.ttf']))
      .pipe($.gulpFont({
        ext: gulp.config.icons.ext,
        name: gulp.config.icons.name,
        embed: ['woff'],
        collate: false,
        fontface: gulp.config.src + '/assets/icons',
        relative: 'assets/icons',
        dest: gulp.config.dest + '/assets/icons'
      }))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
  gulp.task('icon:preview', 'icons preview', ['icon'], function () {
    $.browserSync({
      server: gulp.config.src + '/assets/icons/preview'
    });
  });
  gulp.task('icon:preview:sync', 'icons preview', ['icon:sync'], function () {
    $.browserSync({
      server: gulp.config.src + '/assets/icons/preview'
    });
  });
  gulp.task('icon:sync', 'icons preview', ['icon'], function () {
    gulp.watch(gulp.config.src + '/assets/icons/*.sketch', {
      debounceDelay: 4000
    }, ['icon']);
  });
  return gulp;
};



