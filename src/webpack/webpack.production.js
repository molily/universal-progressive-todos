import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import base from './webpack-base';

export default {
  ...base,
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
