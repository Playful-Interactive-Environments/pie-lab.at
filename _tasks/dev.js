var noop = require('./noop');
var yargs = require('yargs').argv;

var dev = function(task) {
  return yargs.env === 'prod' ? noop() : task;
};

dev.isDev = yargs.env !== 'prod';

module.exports = dev;
