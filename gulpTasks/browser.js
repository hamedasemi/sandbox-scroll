
module.exports = function (gulp, $) {
  // Tasks browser sync
  gulp.task('browser', 'browser sync', [], function () {
    //	browser-sync https://www.npmjs.com/package/browser-sync
    //	Live CSS Reload & Browser Syncing
    $.browserSync({
      // Browsersync options http://www.browsersync.io/docs/options/
      online: $.argv.online,
      codeSync: $.argv.sync,
      middleware: [
        $.connectModrewrite(['^[^\\.]*$ /index.html [L]'])
      ],
      open: $.argv.open,
      xip: $.argv.xip,
      logSnippet: $.argv.debug,
      tunnel: $.argv.tunnel,
      port: $.argv.port || gulp.config.port,
      server: !$.argv.proxy && (typeof $.argv.server == 'string' ? $.argv.server : gulp.config.dest),
      proxy: $.argv.proxy && (typeof $.argv.proxy == 'string' ? $.argv.proxy : gulp.config.proxy),
      https: $.argv.https,
      logConnections: $.argv.debug,
      logFileChanges: $.argv.debug,
      startPath: $.argv.start,
      logLevel: $.argv.info ? 'info' : $.argv.debug ? 'debug' : false,
      notify: $.argv.info,
      ghostMode: {
        clicks: $.argv.ghost,
        forms: $.argv.ghost,
        scroll: $.argv.ghost
      }
    }, function (err, bs) {
      if(!$.argv.sync){
        bs.addMiddleware('*', $.connectGzipStatic(gulp.config.dest), {
          override: true
        });
      }
    });
  });
  return gulp;
};
