const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

dotenv.config();

module.exports = {
  entry: './src/app/widget.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'widget.js',
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
    minimize: true,

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            drop_console: true,
            pure_funcs: ['console.info', 'console.debug', 'console.log'],
          },
        },
        extractComments: false,
      }),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],

  devtool: 'source-map',
  mode: 'production'
};
