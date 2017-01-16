var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    prefix = require('gulp-autoprefixer'),
    purify = require('gulp-purifycss'),
    uglify = require('gulp-uglify'),
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

// Concat Javascript files
gulp.task('scripts', function() {
    return gulp.src([
            paths.js + '/available-js.js',
            paths.js + '/touch.js',
            paths.js + '/projects.js',
            paths.js + '/menu.js',
            paths.js + '/viewport-width.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

// Minify scripts
gulp.task('uglify', ['scripts'], function() {
    return gulp.src([
            paths.js + '/main.js'
        ])
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.js));
});

// Static Server + watching scss/html files
gulp.task('serve', ['scripts', 'sass'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch(paths.scss + '/' + '**/*.scss', ['sass']);
    gulp.watch([
        paths.js + '/' + '*', !paths.js + '/' + 'main.js'
    ], ['scripts']);
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

// Minify css
gulp.task('purify', ['sass'], function() {
    return gulp.src(paths.css + '/' + 'main.css')
        .pipe(purify([
            'src/*.js',
            'src/*.html'
        ], { minify: true }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(paths.css));
});

gulp.task('clean', function() {
    return del([
        paths.css + '/main.css',
        paths.css + '/main.min.css',
        paths.js + '/main.js',
        paths.js + '/main.min.js',
        'dist',
        'css',
        'img',
        'js',
        '*.html'
    ], { force: true });
});

gulp.task('build', ['clean', 'uglify', 'purify'], function() {
    return gulp.src([
            paths.css + '/main.css',
            paths.js + '/main.js',
            paths.css + '/main.min.css',
            paths.js + '/main.min.js',
            paths.img + '/' + '*',
            paths.html
        ], { base: 'src/' })
        .pipe(gulp.dest(''));
});

gulp.task('default', ['serve']);
