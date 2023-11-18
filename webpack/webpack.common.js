const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpackPluginEvmts } = require('@evmts/webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/scripts/game.ts', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve("process/browser"),
      'process/browser': require.resolve('process/browser')

    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        include: path.join(__dirname, '../src'),
        loader: 'ts-loader',
        options: {
          // when @evmts/tsc is complete can use that instead of transpile only to do typechecking
          // @see ✨ feat: Add evmts-tsc https://github.com/evmts/evmts-monorepo/pull/446
          // compiler: '@evmts/tsc',
          transpileOnly: true
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'My Phaser Game', template: 'src/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'pwa', to: '' },
        { from: 'src/favicon.ico', to: '' }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.DEBUG': JSON.stringify('eth-js')
    }),
    webpackPluginEvmts(),
  ],
  experiments: {
    topLevelAwait: true
  }
}
