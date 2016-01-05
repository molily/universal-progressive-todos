import path from 'path';

const filename = 'client.js';

export default {
  entry: `./src/${filename}`,
  output: {
    path: path.resolve('./dist/static/'),
    filename: filename,
    publicPath: '/static/',
    devtoolModuleFilenameTemplate: '[resource-path]'
  }
};
