

//	Gulp load plugins, automatically load any gulp plugins in your package.json
//  NPM: https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')({
	pattern: ['*'],
    replaceString: /^(|\.)/,
    scope: ['devDependencies','nodeDevDependencies'],
    lazy: true
});

var $$ = require('./../package.json').config;



gulp.task('handlebars', 'Handlebars templates', [], function () {
    return gulp
        .src(config.src + '/views/layout/main.hbs')
        .pipe($.gulpPlumber({
            errorHandler: onError
        }))
        .pipe($.gulpCompileHandlebars($.yamljs.load('./' + config.src + '/data/sh/overview.yaml'), {
            batch: [config.src + '/views/partials'],
            helpers: require('./' + config.src + '/views/helpers')
        }))
        .pipe($.gulpRename('index.html'))
        .pipe(gulp.dest(config.dest))
        .pipe($.browserSync.stream());
});


module.exports = function(gulp) {
    // Handlebars compile https://www.npmjs.com/package/gulp-compile-handlebars
    // Compile Handlebars templates to file - gulp plugin
    gulp.task('handlebars',  'Handlebars templates', [], function() {
        gulp.src(gulp.config.src.templates + '/layout/main.hbs')
            .pipe($.gulpPlumber({
                errorHandler: gulp.onError
            }))
            .pipe($.gulpCompileHandlebars({
                    firstName: 'Hamed'
                },{
                batch: [gulp.config.src.templates + '/partials'],
                helpers: require('./' + gulp.config.src.templates + '/helpers')
            }))
            .pipe($.gulpRename('index.html'))
            .pipe(gulp.dest(gulp.config.dest))
            .pipe($.browserSync.reload({
                stream: true
            }));
    },
        //	gulp-help#taskOptions
        //	Type: Object
        {
            //	gulp-help#taskOptions.aliases
            //	Type: Array
            aliases: ['hbs'],
            //	gulp-help#taskOptions.options
            //	Type: Object
            options: {
                //	TODO: add function and description
                'env=prod': 'TODO',
                //	TODO: add desctiption
                'debug': 'TODO'
            }
        });

    gulp.task('handlebars:watch', 'watch ".hbs" files and reload', ['handlebars'], function() {
        gulp.watch(gulp.config.src.templates + '/**/*.hbs', ['handlebars']);
    },
        //	gulp-help#taskOptions
        //	Type: Object
        {
            //	gulp-help#taskOptions.aliases
            //	Type: Array
            aliases: ['hbs:watch'],
            //	gulp-help#taskOptions.options
            //	Type: Object
            options: {
                //	TODO: add function and description
                'env=prod': 'TODO',
                //	TODO: add desctiption
                'debug': 'TODO'
            }
        });

    // Handlebars compile map https://www.npmjs.com/package/gulp-compile-handlebars
    // Compile Handlebars templates to file - gulp plugin
    gulp.task('handlebars:map',  'Map Handlebars templates', [], function() {
        gulp.src(gulp.config.src.templates + '/**/*.hbs')
            .pipe($.gulpPlumber({
                errorHandler: gulp.onError
            }))
            .pipe($.gulpCompileHandlebars(null,{
                batch: [gulp.config.src.templates + '/partials'],

            }))
            .pipe($.gulpRename({
                extname: '.html'
            }))
            .pipe(gulp.dest(gulp.config.dest))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    gulp.task('handlebars:map:watch', 'watch ".hbs" files and reload', ['handlebars:map'], function() {
        gulp.watch(gulp.config.src.templates + '/**/*.hbs', ['handlebars:map']);
    });

    gulp.task('handlebars:js',  'js Handlebars templates', [], function() {
        gulp.src(gulp.config.src.templates + '/templates/**/*.hbs')
            .pipe($.gulpPlumber({
                errorHandler: gulp.onError
            }))
            // Handlebars precompile https://www.npmjs.com/package/gulp-handlebars
            // Handlebars plugin for gulp
            .pipe($.gulpHandlebars())
            // Gulp wrap https://www.npmjs.com/package/gulp-wrap
            // TODO: gulp wrap explanations to be added
            .pipe($.gulpWrap('Handlebars.template(<%= contents %>)'))
            // Gulp declare https://www.npmjs.com/package/gulp-declare
            // TODO: gulp declare explanations to be added
            .pipe($.gulpDeclare({
                root: 'exports',
                namespace: 'Book.template',
                noRedeclare: true
            }))
            .pipe($.gulpConcat('templates.js'))
            .pipe($.gulpWrap('var Handlebars = require("gulp-handlebars/node_modules/handlebars/dist/handlebars.runtime");\n <%= contents %>'))
            .pipe(gulp.dest(gulp.config.dest))
            .pipe($.browserSync.reload({
                stream: true
            }));
    },{
        //	Gulp Help
        //	Adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
        //
        //  https://www.npmjs.com/package/gulp-help
        //  https://github.com/chmontgomery/gulp-help
        //
        //	https://github.com/chmontgomery/gulp-help#taskoptionsaliases
        aliases: ['hbs:js'],
        //	https://github.com/chmontgomery/gulp-help#taskoptionsoptions
        options: {
            'env=prod': 'TODO',
            'debug': 'TODO'
        }
    });

    gulp.task('handlebars:js:watch', 'watch ".hbs" files and reload', ['handlebars:js'], function() {
        gulp.watch(gulp.config.src.templates + '/templates/**/*.hbs', ['handlebars:js']);
    },{
        //	Gulp Help
        //	Adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
        //
        //  https://www.npmjs.com/package/gulp-help
        //  https://github.com/chmontgomery/gulp-help
        //
        //	https://github.com/chmontgomery/gulp-help#taskoptionsaliases
        aliases: ['hbs:js:watch'],
        //	https://github.com/chmontgomery/gulp-help#taskoptionsoptions
        options: {
            'env=prod': 'TODO',
            'debug': 'TODO'
        }
    });
    return gulp;
};



