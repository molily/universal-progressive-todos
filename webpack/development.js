import webpack from 'webpack';
import base from './base';

export default {
  ...base,
  devtool: 'eval',
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
        loader: 'eslint-loader',
        options: {
          // Do not emit errors, it breaks hot loading of components.
          emitError: false,
          emitWarning: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
