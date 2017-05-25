import webpack from 'webpack';
import base from './webpack-base';

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
        loader: 'eslint-loader'
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
