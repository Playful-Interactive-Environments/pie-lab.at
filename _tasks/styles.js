var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var dev = require('./dev');
var stylelint = require('stylelint');

gulp.task('styles', function() {
  return gulp.src('_sass/main.scss').
    pipe(dev(sourcemaps.init())).
    pipe(sass()).
    on('error', function(err) {
      console.log(err);
      this.emit('end');
    }).
    pipe(cleanCSS()).
    pipe(dev(sourcemaps.write())).
    pipe(gulp.dest('./css/'));
});

gulp.task('styles:lint', function() {
  return stylelint.lint({
    files: ['_sass/**/*.scss', '!_sass/vendor/*.scss'],
    syntax: 'scss',
    formatter: 'string',
  }).then(function(data) {
    if (data.errored) {
      console.error(data.output);
    }
  }).catch(function(err) {
    console.error(err.stack);
  });
});

gulp.task('styles:watch', gulp.series('styles', function(done) {
  gulp.watch('_sass/**/*.scss', gulp.series('styles:lint', 'styles'));
  done();
}));
