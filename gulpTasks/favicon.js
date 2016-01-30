
//
// 'font': {
// 	'src': '/assets/fonts/**/*.{ttf,otf}',
// 	'ext': '.less',
// 	'fontface': 'app/assets/fonts',
// 	'relative': '/assets/fonts',
// 	'dest': 'www/assets/fonts',
// 	'embed': [
// 		'woff'
// 	],
// 	'collate': false
// },
// 'favicons': {
// 	'ext': '.less',
// 	'name': 'glyphs'
// }

'use strict';

module.exports = function (gulp, $) {
  // Tasks
  gulp.task('favicon', [], function () {
    // var runTimestamp = Math.round(Date.now() / 1000);
    gulp.src(gulp.config.src + '/assets/favicons/*.sketch')
    //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
    //  NPM: https://www.npmjs.com/package/gulp-plumber
      .pipe($.gulpPlumber({
        errorHandler: gulp.onError
      }))
      .pipe($.gulpSketch({
        export: 'artboards',
        formats: 'png'
      }))
      .pipe($.gulpFavicons({
        appName: 'BeatQuiz',                  // Your application's name. `string`
        appDescription: null,           // Your application's description. `string`
        developerName: null,            // Your (or your developer's) name. `string`
        developerURL: null,             // Your (or your developer's) URL. `string`
        background: '#fff',             // Background colour for flattened icons. `string`
        path: 'http://client.apegroup-interim-music-quiz.appspot.com/',                      // Path for overriding default icons path. `string`
        url: 'http://client.apegroup-interim-music-quiz.appspot.com/favicon-230x230.png',                       // Absolute URL for OpenGraph image. `string`
        display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
        orientation: 'portrait',        // Android orientation: 'portrait' or 'landscape'. `string`
        version: '1.0',                 // Your application's version number. `number`
        logging: $.argv.debug,          // Print logs to console? `boolean`
        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
        html: gulp.config.src + '/assets/favicons/favicons.hbs',
        icons: {
          android: true,              // Create Android homescreen icon. `boolean`
          appleIcon: true,            // Create Apple touch icons. `boolean`
          appleStartup: true,         // Create Apple startup images. `boolean`
          coast: true,                // Create Opera Coast icon. `boolean`
          favicons: true,             // Create regular favicons. `boolean`
          firefox: true,              // Create Firefox OS icons. `boolean`
          opengraph: true,            // Create Facebook OpenGraph image. `boolean`
          twitter: true,              // Create Twitter Summary Card image. `boolean`
          windows: true,              // Create Windows 8 tile icons. `boolean`
          yandex: true                // Create Yandex browser icon. `boolean`
        }
      }))
      .pipe(gulp.dest(gulp.config.dest))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
  return gulp;
};



