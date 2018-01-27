const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = merge(common, {
  output: {
    filename: '[name].js',
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    open: false, // open the web browser on start
    // allow the dev server to be access externally
    // this is useful when using ngrok
    host: '0.0.0.0',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
