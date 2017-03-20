const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootDir = path.join(__dirname, '../');
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: [
      'es6-promise',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'pro' ? 'warning' : false
  },
  output: {
    path: path.join(__dirname, '../public/javascripts/'),
    publicPath: '/javascripts/',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
};

if (process.env.NODE_ENV === 'pro') {
  vueConfig.loaders = {
    stylus: ExtractTextPlugin.extract({
      loader: 'css-loader!stylus-loader',
      fallback: 'vue-style-loader' // <- this is a dep of vue-loader
    })
  };

  module.exports.plugins.push(
    new ExtractTextPlugin('styles.[hash].css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
} else {
  module.exports.devtool = '#source-map';
}
