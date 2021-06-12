const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { staticFileExtensions, commonSrcPath, extSrcPath, extDistPath, baseConfig } = require('./webpack.base');

const extConfig = {
  ...baseConfig,
  entry: {
    ...(baseConfig.entry ?? {}),
    'pages/options': [join(extSrcPath, 'pages/options.tsx')],
    'pages/ytm/content': [join(extSrcPath, 'pages/ytm/content.ts')],
  },
  output: {
    ...(baseConfig.output ?? {}),
    path: extDistPath,
    filename: '[name].js',
  },

  plugins: [
    ...(baseConfig.plugins ?? []),
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
      ],
    }),
  ],
};

module.exports = extConfig;
