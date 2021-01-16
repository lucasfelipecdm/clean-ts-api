module.exports = {
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
