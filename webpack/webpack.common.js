const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // might be a good idea to create a 2nd vendor bundle
    app: path.resolve(__dirname, '../src/assets/javascripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/assets/',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        context: 'src/assets/images',
        from: '**/*',
        to: 'images',
      },
      {
        context: 'src/assets/fonts',
        from: '**/*',
        to: 'assets',
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.vue', '.sass', '.scss', '.css'],
  },
  module: {
    rules: [
      // SASS / CSS Support
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      // Static Image support
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
