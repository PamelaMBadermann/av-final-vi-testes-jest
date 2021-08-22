"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
class Database {
    static getConnection() {
        if (!Database.connection) {
            throw new Error('CONEXAO_DATABASE_NAO_ABERTA');
        }
        return Database.connection;
    }
    async openConnection() {
        if (!Database.connection) {
            Database.connection = await typeorm_1.createConnection();
        }
    }
    async disconnectDatabase() {
        if (!Database.connection) {
            throw new Error('CONEXAO_DATABASE_NAO_ABERTA');
        }
        await Database.connection.close();
    }
}
exports.Database = Database;
