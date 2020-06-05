const { join } = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const {
  staticFileExtensions,
  commonSrcPath,
  webSrcPath,
  webDistPath,
  baseConfig,
} = require('./webpack.base')

const webConfig = merge(baseConfig, {
  entry: {
    app: [join(webSrcPath, 'index.tsx')],
  },
  output: {
    path: webDistPath,
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: join(webDistPath, 'index.html'),
      template: join(webSrcPath, 'index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(webSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
          to: webDistPath,
          context: webSrcPath,
        },
        {
          from: join(webSrcPath, `_redirects`),
          to: webDistPath,
          context: webSrcPath,
        },
        {
          from: join(commonSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
          to: webDistPath,
          context: commonSrcPath,
        },
      ]
    }),
    new GenerateSW({
      swDest: 'sw.js',
      exclude: [/_redirects$/],
    }),
  ],

  devServer: {
    historyApiFallback: true,
  },
})

module.exports = webConfig
