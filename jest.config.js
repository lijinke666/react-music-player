module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: ['node_modules', '.history/*'],
  modulePathIgnorePatterns: ['/.history/'],
  moduleDirectories: ['node_modules', '.', 'src', 'src/shared'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  rootDir: __dirname,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
}
