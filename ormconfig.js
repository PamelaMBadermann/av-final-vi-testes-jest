require('dotenv').config();

let config = {};

if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
    config = {
        type: 'sqlite',
        database: './testedb.sql',
        entities: [
            'src/core/infra/data/database/entities/**/*'
        ],
        migrations: [
            'src/core/infra/data/database/migrations/**/*'
        ]
    }
} else {
    config = {
        type: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
        logging: false,
        entities: [
            'src/core/infra/data/database/entities/**/*'
        ],
        migrations: [
            'src/core/infra/data/database/migrations/**/*'
        ],
        cli: {
            entitiesDir: 'src/core/infra/data/database/entities',
            migrationsDir: 'src/core/infra/data/database/migrations'
        },
        extra: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    };
}

module.exports = config;