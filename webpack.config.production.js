require('../src/util/promisePolyfill')();
var path = require('path');
var webpack = require('webpack');
var webpackResolve = require('./webpackResolve');
var webpackLoaders = require('./webpackLoaders');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.resolve('./dist/static/'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ],
  resolve: webpackResolve(),
  module: {
    loaders: webpackLoaders({ readableClassNames: false })
  },
};
