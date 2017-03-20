const path = require('path');
const webpack = require('webpack');
const clientConfig = require('./webpack.config');

module.exports = function setupDevServer (app) {
  // setup on the fly compilation + hot-reload
  for (var key in  clientConfig.entry) {
    if (key !== 'vendor') {
      clientConfig.entry[key] = ['webpack-hot-middleware/client', clientConfig.entry[key]];
    }
  }

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  const clientCompiler = webpack(clientConfig);
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });
  app.use(devMiddleware);

  app.use(require('webpack-hot-middleware')(clientCompiler));
};
