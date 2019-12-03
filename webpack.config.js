// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: "current" } }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.min\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              url: false
            }
          },
          'sass-loader'
        ],
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: './index.html'
    },
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}