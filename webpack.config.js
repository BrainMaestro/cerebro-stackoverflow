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
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ] },
      { test: /\.png$/, use: 'url-loader' },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.s[ac]ss$/, use: ['style-loader','css-loader', 'sass-loader'] }
    ]
  }
};
