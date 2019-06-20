const { join } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootPath = join(__dirname, '.')
const srcPath = join(rootPath, 'src')
const extSrcPath = join(srcPath, 'ext')
const webSrcPath = join(srcPath, 'web')
const commonSrcPath = join(srcPath, 'common')
const distPath = join(rootPath, 'dist')
const extDistPath = join(distPath, 'ext')
const webDistPath = join(distPath, 'web')

const staticFileExtensions = [
  'png',
  'svg',
  'ico',
  'html',
  'css',
  'json',
  'webmanifest',
]

const extConfig = {
  target: 'web',
  entry: {
    'js/options': [join(extSrcPath, 'js/options.js')],
    'js/gpm/content': [join(extSrcPath, 'js/gpm/content.js')],
    'js/ytm/content': [join(extSrcPath, 'js/ytm/content.js')],
  },
  output: {
    path: extDistPath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  module: {},

  resolve: {
    extensions: ['.js'],
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
}

const webConfig = {
  target: 'web',
  entry: {
    index: [join(webSrcPath, 'index.js')],
    share: [join(webSrcPath, 'share.js')],
  },
  output: {
    path: webDistPath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  module: {},

  resolve: {
    extensions: ['.js'],
      },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: join(webSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
        to: webDistPath,
        context: webSrcPath,
      },
      {
        from: join(commonSrcPath, `**/*.{${staticFileExtensions.join(',')}}`),
        to: webDistPath,
        context: commonSrcPath,
      },
    ]),
  ],
}

module.exports = [extConfig, webConfig]
