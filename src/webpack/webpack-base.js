import path from 'path';

const filename = 'client.js';
const destDir = 'static';
const entry = path.resolve(__dirname, '..', filename);
const outputPath = path.resolve(
  __dirname,
  '..',
  '..',
  'dist',
  'client',
  destDir,
);

export default {
  entry,
  output: {
    path: outputPath,
    filename,
    publicPath: `/${destDir}/`,
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
