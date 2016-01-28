
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var variables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');

gulp.task('css', function () {
    var processors = [nested, variables, autoprefixer];
    return gulp
        .src('./app/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('copy', function () {
    gulp
        .src('./app/**/*.html')
        .pipe(gulp.dest('./wwwroot/'));
    gulp
        .src('./app/**/*.js')
        .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('copy:watch', ['copy'], function () {
    gulp.watch('./app/**/*.{html,js}', ['copy']);
});

gulp.task('css:watch', ['css'], function () {
    gulp.watch('./app/**/*.css', ['css']);
});

gulp.task('default', []);