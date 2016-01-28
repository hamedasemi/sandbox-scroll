
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var variables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');

gulp.task('css', function () {
    var processors = [nested, variables, autoprefixer];
    return gulp
        .src('./app/**/*.css')
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./wwwroot/css'))
        .pipe(minifyCss())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./wwwroot/css/'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('css:watch', ['css'], function () {
    gulp.watch('./app/**/*.css', ['css']);
});

gulp.task('js', function () {
    return gulp
        .src('./app/**/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('./wwwroot/js'))
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./wwwroot/js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('js:watch', ['js'], function () {
    gulp.watch('./app/**/*.js', ['js']);
});

gulp.task('copy', function () {
    gulp
        .src('./app/**/*.html')
        .pipe(gulp.dest('./wwwroot'));
});

gulp.task('copy:watch', ['copy'], function () {
    gulp.watch('./app/**/*.html', ['copy']);
});

gulp.task('default', []);