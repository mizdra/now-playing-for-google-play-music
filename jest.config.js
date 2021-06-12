// @ts-check
/* eslint-env node */

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
    'jest-playwright': {
      // launchType: 'LAUNCH',
      // launchOptions: { headless: false, slowMo: 1000 },
      launchOptions: { slowMo: 500 },
    },
  },
  testMatch: ['**/*.test.(ts|tsx)'],
};
