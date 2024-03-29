module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!*.d.ts'],
  coverageDirectory: './coverage/',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',

    '^Assets/(.*)$': '<rootDir>/src/assets/$1',
    '^Audio/(.*)$': '<rootDir>/src/assets/audio/$1',
    '^Components/(.*)$': '<rootDir>/src/components/$1',
    '^Data/(.*)$': '<rootDir>/src/assets/data/$1',
    '^Entities/(.*)$': '<rootDir>/src/entities/$1',
    '^Images/(.*)$': '<rootDir>/src/assets/images/$1',
    '^States/(.*)$': '<rootDir>/src/redux-states/$1',
    '^Styles/(.*)$': '<rootDir>/src/styles/$1',
    '^Utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['./**/*.{spec,test}.{js,jsx,ts,tsx}'],
  verbose: true,
};
