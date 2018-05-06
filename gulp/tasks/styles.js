const gulp = require('gulp'),
  postCSS = require('gulp-postcss'),
  importCSS = require('postcss-import'),
  mixins = require('postcss-mixins'),
  nestedCSS = require('postcss-nested'),
  simpleVars = require('postcss-simple-vars'),
  autoprefixer = require('autoprefixer');

function swallowError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('styles', () => {
  return gulp
    .src('./src/css/main.css')
    .pipe(postCSS([importCSS, mixins, simpleVars, nestedCSS, autoprefixer]))
    .on('error', swallowError)
    .pipe(gulp.dest('./src/temp/styles'));
});
