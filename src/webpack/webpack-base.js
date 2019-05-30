import path from 'path';

const filename = 'client.js';
const destDir = 'static';
const entry = path.resolve(__dirname, '..', filename);
const outputPath = path.resolve(__dirname, '..', '..', 'dist', destDir);

export default {
  entry,
  output: {
    path: outputPath,
    filename,
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
