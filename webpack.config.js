const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index'
  },
  output: {
    path: './dist',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  node: {
    __dirname: true,
  },
  target: 'electron-renderer',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        query: {
          modules: true
        }
      }]
    }, {
      test: /\.png$/,
      use: {
        loader: 'url-loader'
      }
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.s[ac]ss$/,
      use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "sass-loader"
      }]
  }]
  }
};
