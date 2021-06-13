const { join } = require('path');

const rootPath = join(__dirname, '.');
const srcPath = join(rootPath, 'src');
const extSrcPath = join(srcPath, 'ext');
const webSrcPath = join(srcPath, 'web');
const commonSrcPath = join(srcPath, 'common');
const distPath = join(rootPath, 'dist');
const extDistPath = join(distPath, 'ext');
const webDistPath = join(distPath, 'web');

const staticFileExtensions = ['png', 'svg', 'ico', 'html', 'json', 'webmanifest'];

const baseConfig = {
  target: 'web',
  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: join(rootPath, 'tsconfig.src.json'),
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

module.exports = {
  rootPath,
  srcPath,
  commonSrcPath,
  extSrcPath,
  webSrcPath,
  distPath,
  extDistPath,
  webDistPath,
  staticFileExtensions,
  baseConfig,
};
