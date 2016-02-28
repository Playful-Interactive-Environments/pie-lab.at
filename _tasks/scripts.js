var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gutil');
var source = require('vinyl-source-stream');
var dev = require('./dev');
var eslint = require('gulp-eslint');
var merge = require('merge2');
var prod = require('./prod');

var b = browserify({
  entries: ['_js/main.js'],
  debug: dev.isDev
}).transform("babelify");

var bundle = function() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./js/'));
};

var lint = function() {
  return gulp.src(['_js/**/*.js', '!_js/vendor/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(prod(eslint.failAfterError()));
};

gulp.task('scripts', ['scripts:lint'], bundle);

gulp.task('scripts:watch', function() {
  b = watchify(b);
  return bundle();
});

b.on('update', function(done) {
  return merge(bundle(), lint());
});
b.on('log', gutil.log);

gulp.task('scripts:lint', lint);
