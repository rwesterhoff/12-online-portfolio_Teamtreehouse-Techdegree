var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    prefix = require('gulp-autoprefixer'),
    purify = require('gulp-purifycss'),
    rename = require('gulp-rename'),
    del = require('del');

var paths = {
    scss: 'src/sass',
    css: 'src/css',
    img: 'src/img',
    html: 'src/*.html',
    js: 'src/js/**/*.js'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch(paths.scss + '/' + '**/*.scss', ['sass']);
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

gulp.task('build', ['clean'/*, 'purify'*/], function() {
    return gulp.src([paths.css + '/main.css' , paths.js , paths.img + '/' + '*', paths.html], { base: 'src/' })
        .pipe(gulp.dest(''));
});

gulp.task('default', ['serve']);
