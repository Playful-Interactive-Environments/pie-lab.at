var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');
var runSequence = require('run-sequence');

gulp.registry(FwdRef());

gulp.task('default', gulp.series('scripts', 'styles', 'site'));

gulp.task('build', gulp.series('scripts', 'styles', 'site'));

gulp.task('dev', gulp.parallel('scripts:watch', 'styles:watch', 'site:watch'));

gulp.task('test', gulp.parallel('scripts:lint', 'styles:lint'));
