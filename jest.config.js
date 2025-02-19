module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
  };
  