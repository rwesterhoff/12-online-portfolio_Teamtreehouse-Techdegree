var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    prefix = require('gulp-autoprefixer'),
    purify = require('gulp-purifycss'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del');

var jshint = require('gulp-jshint');


var paths = {
    scss: 'src/sass',
    css: 'src/css',
    img: 'src/img',
    html: 'src/*.html',
    js: 'src/js'
}


gulp.task('lint', function() {
    return gulp.src([paths.js + '/' + '*.js'/*, !(paths.js + '/' + 'main.js') */])
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

// Concat Javascript files
gulp.task('scripts', function() {
    return gulp.src([
            paths.js + '/available-js.js',
            paths.js + '/touch.js',
            paths.js + '/projects.js',
            paths.js + '/menu.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['scripts', 'sass'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch(paths.scss + '/' + '**/*.scss', ['sass']);
    gulp.watch(paths.js + '/' + '*', ['scripts']);
    gulp.watch(paths.html).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(paths.scss + '/' + 'main.scss')
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

gulp.task('purify', ['sass'], function() {
    return gulp.src(paths.css + '/' + 'main.css')
        .pipe(purify(['src/*.js', 'src/*.html'], { minify: true }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('clean', function() {
    return del(['dist', 'css', 'img', 'js', '*.html'], { force: true });
});

gulp.task('build', ['clean' /*, 'purify'*/ ], function() {
    return gulp.src([paths.css + '/main.css', paths.js, paths.img + '/' + '*', paths.html], { base: 'src/' })
        .pipe(gulp.dest(''));
});

gulp.task('default', ['serve']);
