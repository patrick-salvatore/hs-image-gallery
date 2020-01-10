module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setupTests.ts'],
  moduleNameMapper: {
    '.(css|jpg|png)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
