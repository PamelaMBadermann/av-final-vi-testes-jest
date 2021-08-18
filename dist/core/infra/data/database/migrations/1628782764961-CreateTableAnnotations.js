"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAnnotations1628782764961 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableAnnotations1628782764961 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'annotations',
            columns: [
                {
                    name: 'uid',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '150',
                    isNullable: false
                },
                {
                    name: 'user_uid',
                    type: 'uuid',
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
            ],
            foreignKeys: [
                new typeorm_1.TableForeignKey({
                    columnNames: ['user_uid'],
                    referencedColumnNames: ['uid'],
                    referencedTableName: 'users',
                    name: 'annotations_users'
                })
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('annottations', true, true, true);
    }
}
exports.CreateTableAnnotations1628782764961 = CreateTableAnnotations1628782764961;
