require('babel-register');
module.exports = require('./config.' + process.env.NODE_ENV);
