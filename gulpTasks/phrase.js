// $.request('https://api.phraseapp.com/api/v2/projects/ea649a80b7be5f38d2a1a832d1b61c06/?callback=&access_token=577f70bfcb8d02ba83ec2579215e6dccf1d3a0478e3092e6134e66b8921cdfda', function (error, response, body) {
// $.request('https://api.phraseapp.com/api/v2/projects/ea649a80b7be5f38d2a1a832d1b61c06/locales?callback=&access_token=577f70bfcb8d02ba83ec2579215e6dccf1d3a0478e3092e6134e66b8921cdfda', function (error, response, body) {
// $.request('https://api.phraseapp.com/api/v2/projects/ea649a80b7be5f38d2a1a832d1b61c06/locales/f0a218caa7eab69633ab671aed326f88?callback=&access_token=577f70bfcb8d02ba83ec2579215e6dccf1d3a0478e3092e6134e66b8921cdfda', function (error, response, body) {

// include_empty_translations
// format_options

// https://api.phraseapp.com/api/v2/projects/ea649a80b7be5f38d2a1a832d1b61c06/locales/f0a218caa7eab69633ab671aed326f88/download?file_format=json&callback=&access_token=577f70bfcb8d02ba83ec2579215e6dccf1d3a0478e3092e6134e66b8921cdfda

'use strict';

var api = {
  url: 'api.phraseapp.com/api/v2',
  projectId: 'ea649a80b7be5f38d2a1a832d1b61c06',
  fileFormat: 'nested_json',
  accessToken: '577f70bfcb8d02ba83ec2579215e6dccf1d3a0478e3092e6134e66b8921cdfda'
};

var locales = [];

module.exports = function (gulp, $) {

  gulp.task('phrase:get:locales', [], function () {
    return $.request(
      'https://' + api.url +
      '/projects/' + api.projectId +
      '/locales?' +
      '&callback=&access_token=' + api.accessToken, function (x, y, body) {

      locales = body;
    })
      .pipe($.vinylSourceStream('locales.json'))
      .pipe(gulp.dest('./app/assets/data/'));
  });

  gulp.task('phrase:get:locale', ['phrase:get:locales'], function () {
    JSON.parse(locales).map(function(locale){
      $.request(
        'https://' + api.url +
        '/projects/' + api.projectId +
        '/locales/' + locale.id +
        '/download?file_format=' + api.fileFormat +
        '&callback=&access_token=' + api.accessToken)
        .pipe($.vinylSourceStream(''+ locale.name +'.json'))
        .pipe(gulp.dest('./app/assets/data/'));
    });
    
  });
  return gulp;
};
