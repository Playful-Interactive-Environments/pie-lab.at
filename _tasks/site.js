var gulp = require('gulp');
var spawn = require('child_process').spawn;
var yargs = require('yargs').argv;
var path = require('path');
var readline = require('readline');
var buildParams = ['build'];

var log = function(data) {
  console.log('' + data);
};

var errors = 0;

var err = function(data) {
  console.error('' + data);
  errors++;
};


var jekyllTask = function(options, done) {
  var jekyllCommand = process.platform === "win32" ? "jekyll.bat" : "jekyll";
  var jekyll = spawn(jekyllCommand, options);

  var rlErr = readline.createInterface({
    input: jekyll.stderr
  });

  var rlOut = readline.createInterface({
    input: jekyll.stdout
  });

  rlErr.on('line', function(line) {
    if(line.indexOf('warning') >= 0 || line.indexOf('Warning') >= 0) {
      console.log(line);
    } else {
      err(line);
    }
  });

  rlErr.on('close', function() {
    if(errors) {
      throw new Error('Error on build');
    }
  });

  rlOut.on('line', log);

  done();
};

gulp.task('site', function(done) {
  jekyllTask(buildParams, done);
});

gulp.task('site:watch', function(done) {
  jekyllTask(['serve', '-w'], done);
});
