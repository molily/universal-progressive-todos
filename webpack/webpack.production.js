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
    })
  ]
};
