"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1628782754043 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1628782754043 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'uid',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '25',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users', true, true, true);
    }
}
exports.CreateTableUsers1628782754043 = CreateTableUsers1628782754043;
