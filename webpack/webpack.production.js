import webpack from 'webpack';
import base from './webpack-base';

export default {
  ...base,
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        // React doesn’t support IE 8 anyway, so no IE 8 support needed
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
