const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name]-[chunkhash].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
    }),
    new ManifestPlugin(),
    new UglifyJSPlugin({ sourceMap: true }),
  ],
});
