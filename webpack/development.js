import webpack from 'webpack';
import base from './base';

export default {
  ...base,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    base.entry
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: base.module.loaders
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
