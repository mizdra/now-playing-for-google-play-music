const { join } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootPath = join(__dirname, '.')
const srcPath = join(rootPath, 'src')
const distPath = join(rootPath, 'dist')

const staticFileExtensions = [
  'png',
  'svg',
  'ico',
  'html',
  'css',
  'json',
  'webmanifest',
]

module.exports = {
  target: 'web',
  entry: {
    'web/index': [join(srcPath, 'web/index.js')],
    'web/share': [join(srcPath, 'web/share.js')],
    'ext/js/options': [join(srcPath, 'ext/js/options.js')],
    'ext/js/gpm/content': [join(srcPath, 'ext/js/gpm/content.js')],
    'ext/js/ytm/content': [join(srcPath, 'ext/js/ytm/content.js')],
  },
  output: {
    path: distPath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  module: {},

  resolve: {
    extensions: ['.js'],
  },

  plugins: [
    new CopyWebpackPlugin([
      // for web
      {
        from: join(srcPath, `web/**/*.{${staticFileExtensions.join(',')}}`),
        to: join(distPath, 'web'),
        context: join(srcPath, 'web'),
      },
      {
        from: join(srcPath, `common/**/*.{${staticFileExtensions.join(',')}}`),
        to: join(distPath, 'web'),
        context: join(srcPath, 'common'),
      },
      // for ext
      {
        from: join(srcPath, `ext/**/*.{${staticFileExtensions.join(',')}}`),
        to: join(distPath, 'ext'),
        context: join(srcPath, 'ext'),
      },
      {
        from: join(srcPath, `common/**/*.{${staticFileExtensions.join(',')}}`),
        to: join(distPath, 'ext'),
        context: join(srcPath, 'common'),
      },
    ]),
  ],
}
