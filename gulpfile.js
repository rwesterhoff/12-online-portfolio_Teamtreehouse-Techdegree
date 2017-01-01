var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = {
    scss: 'src/sass/**/*.scss',
    css: 'src/css',
    html: 'src/*.html'
}

/*gulp.task('sync', function() {
    bs.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', bs.reload);
});


gulp.task('watch', function() {
    gulp.watch(paths.scss, ['sass', 'sync']);
});

gulp.task('default', ['sass', 'sync', 'watch']);
*/


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
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);