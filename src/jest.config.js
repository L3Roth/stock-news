module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    roots: ['src'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    transform: {
        '^.+\\.(ts|js)$': 'ts-jest',
    },
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@assets/(.*)': '<rootDir>/src/assets/$1',
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@env': '<rootDir>/src/environments/environment',
    },
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  };
  