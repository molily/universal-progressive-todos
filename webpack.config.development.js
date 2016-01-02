var path = require('path');
var webpack = require('webpack');

var localIdentName = 'localIdentName=[name]__[local]__[hash:base64:5]';

module.exports = {
  devtool: 'eval',
  entry: './src/client.js',
  output: {
    path: './dist/static/',
    filename: 'client.js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?' + localIdentName
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};
