module.exports = {
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom'
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  testEnvironment: 'jsdom'
};
