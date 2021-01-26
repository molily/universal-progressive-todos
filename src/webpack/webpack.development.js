/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

import base from './webpack-base';

export default {
  ...base,
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: ['webpack-hot-middleware/client?reload=true&noInfo=true', base.entry],
  plugins: [new webpack.HotModuleReplacementPlugin(), new ESLintPlugin()],
};
