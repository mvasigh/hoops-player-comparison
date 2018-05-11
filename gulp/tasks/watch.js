const gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync').create();

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    notify: false
  });

  watch('./src/index.html', () => {
    browserSync.reload();
  });

  watch('./src/css/**/*.css', () => {
    gulp.start('injectCSS');
  });
});

gulp.task('injectCSS', ['styles'], () => {
  return gulp.src('./src/css/main.css').pipe(browserSync.stream());
});
