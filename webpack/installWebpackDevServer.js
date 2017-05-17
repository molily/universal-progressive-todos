import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.development';

export default (app) => {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 100
    },
    // Minimize the output of webpack.
    // See https://github.com/webpack/docs/wiki/node.js-api#statstojsonoptions
    stats: {
      // minimal: true,
      assets: false,
      cached: false,
      children: false,
      chunkModules: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      timings: false,
      version: false
    }

  }));

  app.use(webpackHotMiddleware(compiler));
};
