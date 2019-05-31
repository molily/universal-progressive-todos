import webpack from 'webpack';
import base from './webpack-base';

export default {
  ...base,
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true&noInfo=true',
    base.entry
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};