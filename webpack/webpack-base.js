import path from 'path';

const filename = 'client.js';
const destDir = 'static';
const baseDir = path.resolve(__dirname, '..');
const entry = path.resolve(baseDir, 'src', filename);
const outputPath = path.resolve(baseDir, 'dist', destDir);

export default {
  entry: entry,
  output: {
    path: outputPath,
    filename: filename,
    publicPath: `/${destDir}/`,
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
