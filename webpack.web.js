const { join } = require('path')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const { DefinePlugin } = require('webpack');

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
          globOptions: {
            ignore: [join(webSrcPath, 'index.html')]
          },
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
      ],
    }),
    new GenerateSW({
      swDest: 'sw.js',
      exclude: [/_redirects$/],
    }),
    // ref: https://github.com/remarkjs/react-markdown/issues/189
    new DefinePlugin({
      process: {
        cwd: () => {},
      },
    })
  ],

  resolve: {
    fallback: { path: require.resolve('path-browserify') },
  },

  devServer: {
    historyApiFallback: true,
  },
})

module.exports = webConfig
