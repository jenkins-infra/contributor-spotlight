module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json'],
    // setupFilesAfterEnv removed for simplicity
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
};
