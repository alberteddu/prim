module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['src/**/{!(index),}.{js,ts}'],
  moduleNameMapper: {
    '@prim/(.*)': '<rootDir>/src/$1',
  },
  setupFiles: ['./src/lib.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
