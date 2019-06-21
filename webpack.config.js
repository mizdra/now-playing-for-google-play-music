const { join } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

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
    'js/options': [join(extSrcPath, 'js/options.ts')],
    'js/gpm/content': [join(extSrcPath, 'js/gpm/content.ts')],
    'js/ytm/content': [join(extSrcPath, 'js/ytm/content.ts')],
  },
  output: {
    path: extDistPath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: join(rootPath, 'tsconfig.json'),
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
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
    app: [join(webSrcPath, 'index.tsx')],
  },
  output: {
    path: webDistPath,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: join(rootPath, 'tsconfig.json'),
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: join(webDistPath, 'index.html'),
      template: join(webSrcPath, 'index.html'),
      inject: true,
    }),
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
    new GenerateSW({
      swDest: 'sw.js',
    }),
  ],
}

module.exports = [extConfig, webConfig]
