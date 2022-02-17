// module.exports = {
//   collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
//   moduleNameMapper: {
//     // Handle CSS imports (without CSS modules)
//     '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

//     /* Handle image imports
//     https://jestjs.io/docs/webpack#handling-static-assets */
//     '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//   },
//   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
//   },
//   transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// }

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// custom jest config
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
