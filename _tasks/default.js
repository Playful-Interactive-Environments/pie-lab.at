var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['scripts', 'styles', 'site']);

gulp.task('build', function(done) {
  runSequence(['scripts', 'styles', 'site'], done);
});

gulp.task('dev', ['scripts:watch', 'styles:watch', 'site:watch']);

gulp.task('test', ['scripts:lint', 'styles:lint']);
