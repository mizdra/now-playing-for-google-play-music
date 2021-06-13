// @ts-check
/* eslint-env node */

const { join } = require('path');

const extensionDir = join(__dirname, 'dist/ext');

/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  roots: ['<rootDir>/e2e-test'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    /** @type import('jest-playwright-preset').JestPlaywrightConfig */
    // @ts-ignore
    'jest-playwright': {
      browsers: ['chromium'],
      userDataDir: '/tmp/test-user-data-dir',
      launchType: 'PERSISTENT',
      launchOptions: {
        // 何故か false にしないと共有ボタンが mount されないので false に
        headless: false,
        slowMo: 500,
        args: [`--disable-extensions-except=${extensionDir}`, `--load-extension=${extensionDir}`],
      },
      contextOptions: {
        locale: 'ja_JP',
      },
    },
  },
  testMatch: ['**/*.test.(ts|tsx)'],
};
