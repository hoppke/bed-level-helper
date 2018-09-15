'use strict'
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve('./src/app/index.js'), // webpack entry point. Module to start building dependency graph
  output: {
    path: path.resolve('./dist'), // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: { // where we defined file patterns and their loaders
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
          failOnWarning: true
          // configFile: "eslint.json"
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [ // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: path.resolve('./src/public/index.html'),
      inject: 'body'
    })
  ],
  devServer: { // configuration for webpack-dev-server
    contentBase: path.resolve('./src/public'), // source of static assets
    port: 7700 // port to run dev-server
  }
}
