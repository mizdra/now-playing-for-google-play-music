const { join } = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
  staticFileExtensions,
  commonSrcPath,
  extSrcPath,
  extDistPath,
  baseConfig,
} = require('./webpack.base')

const extConfig = merge(baseConfig, {
  entry: {
    'pages/options': [join(extSrcPath, 'pages/options.tsx')],
    'pages/gpm/content': [join(extSrcPath, 'pages/gpm/content.ts')],
    'pages/ytm/content': [join(extSrcPath, 'pages/ytm/content.ts')],
  },
  output: {
    path: extDistPath,
    filename: '[name].js',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(extSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
          to: extDistPath,
          context: extSrcPath,
        },
        {
          from: join(commonSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
          to: extDistPath,
          context: commonSrcPath,
        },
      ]
    }),
  ],
})

module.exports = extConfig
