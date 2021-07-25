const { ProvidePlugin } = require('webpack')
const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {

  node: {
    global: true
  },

  mode: "development",

  entry: [
    path.resolve(__dirname, 'src/icns.ts'),
  ],

  output: {
    library: 'icns',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    filename: './index.js'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts'],
    fallback: {
      'util': require.resolve('util/')
    }
  },

  plugins: [

    new ProvidePlugin({ process: 'process/browser' }),

    new NodePolyfillPlugin(),

    new CleanWebpackPlugin(),

  ]

}