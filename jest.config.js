module.exports = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\',
        '<rootDir>/src/core/infra/data/database/migrations',
        '<rootDir>/src/core/presentation/app.ts',
        '<rootDir>/src/core/infra/data/connections/database.ts'
    ],
    roots: [
        '<rootDir>/tests'
    ],
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
};