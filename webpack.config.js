require('babel-register');

const env = process.env.NODE_ENV;
if (!env) {
  throw new Error('The environment variable NODE_ENV need to be set.');
}
module.exports = require(`./webpack/webpack.${env}`);
