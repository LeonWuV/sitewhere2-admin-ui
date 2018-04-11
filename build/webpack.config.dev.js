'use strict'

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'development',

  entry: [
    './src/main.js'
  ],

  devServer: {
    hot: true
  },

  resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      },
      extensions: ['*', '.js', '.vue', '.json']
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader', 'stylus-loader' ]
      }, {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
            cacheDirectory: true
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: path.resolve('static'),
      to: path.resolve('dist'),
      toType: 'dir'
    }])
  ]
}
