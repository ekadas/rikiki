require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'node_modules': path.resolve(__dirname, 'node_modules')
    },
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.svg',
      favicons: {
        start_url: '',
        theme_color: '#000'
      }
    }),
    new CompressionPlugin(),
    new OfflinePlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    publicPath: '/'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
