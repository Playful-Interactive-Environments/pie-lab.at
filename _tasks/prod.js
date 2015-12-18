var noop = require('./noop');
var yargs = require('yargs').argv;

var prod = function(task) {
  return yargs.env === 'prod' ? task : noop();
};

module.exports = prod;
