import path from 'path';

const filename = 'client.js';
const destDir = '/static/';

export default {
  entry: `./src/${filename}`,
  output: {
    path: path.resolve('dist', destDir),
    filename: filename,
    publicPath: destDir,
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
