var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var prefix = require('gulp-autoprefixer');

var paths = {
    scss: 'src/sass/**/*.scss',
    css: 'src/css',
    html: 'src/*.html'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
