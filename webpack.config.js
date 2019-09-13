require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
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
    publicPath: ''
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
      filename: './index.html',
      favicon: './favicon.svg'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  }
}
