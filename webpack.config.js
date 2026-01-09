const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const certPath = path.resolve(__dirname, 'ssl');
const keyFile = path.join(certPath, 'localhost-key.pem');
const certFile = path.join(certPath, 'localhost.pem');

const hasHttpsCerts = fs.existsSync(keyFile) && fs.existsSync(certFile);

module.exports = {
  entry: './widget.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.js'
  },

  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : false,

  devServer: {
    port: 8080,

    server: hasHttpsCerts
      ? {
          type: 'https',
          options: {
            key: fs.readFileSync(keyFile),
            cert: fs.readFileSync(certFile)
          }
        }
      : 'http',

    allowedHosts: 'all',

    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimize: isProduction,
    minimizer: isProduction
      ? [
          new TerserPlugin({
            terserOptions: {
              mangle: true,
              compress: {
                drop_console: true,
                pure_funcs: ['console.info', 'console.debug', 'console.log']
              }
            },
            extractComments: false
          })
        ]
      : []
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    !isProduction &&
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body'
      })
  ].filter(Boolean)
};
