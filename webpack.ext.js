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
    'js/options': [join(extSrcPath, 'js/options.ts')],
    'js/gpm/content': [join(extSrcPath, 'js/gpm/content.ts')],
    'js/ytm/content': [join(extSrcPath, 'js/ytm/content.ts')],
  },
  output: {
    path: extDistPath,
    filename: '[name].js',
  },

  plugins: [
    new CopyWebpackPlugin([
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
    ]),
  ],
})

module.exports = extConfig
