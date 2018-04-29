// const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

// HTML file for public part of site. NB: Maps to index.html

const htmlpublicPlugin = new HtmlWebpackPlugin({
  template: 'src/public/public.ejs',
  filename: 'index.html',
  inject: false
})

// HTML file generation from template for app, both dev and prod
const htmlAppPlugin = new HtmlWebpackPlugin({
  template: 'src/app/app.ejs',
  filename: 'app.html',
  inject: false
})

module.exports = {
  entry: {
    app: './src/app/app.js',
    public: './src/public/public.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name]-bundle.[hash].js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    htmlpublicPlugin,
    htmlAppPlugin,
    new CleanObsoleteChunks(),
    new WebpackCleanupPlugin()
  ]
}
