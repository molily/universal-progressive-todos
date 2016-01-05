import path from 'path';
import fs from 'fs';
import assign from 'object-assign';
import webpack from 'webpack';
import baseConfig from './config.base';

const babelConfigFile = path.join(__dirname, '../.babelrc');
const babelConfig = JSON.parse(
  fs.readFileSync(babelConfigFile, 'utf8')
);
babelConfig.plugins.push([
  'react-transform',
  {
    transforms: [
      {
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }
    ]
  }
]);

export default assign({}, baseConfig, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    baseConfig.entry
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: babelConfig
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  eslint: {
    configFile: '.eslintrc'
  }
});
