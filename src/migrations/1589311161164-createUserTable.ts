import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1589311161164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {name: "user_name", type: "varchar", isNullable: false},
                {name: "first_name", type: "varchar", isNullable: true},
                {name: "last_name", type: "varchar", isNullable: true},
                {name: "email", type: "varchar", isNullable: false},
                {name: "role", type: "varchar", isNullable: false},
                {name: "birthday", type: "varchar", isNullable: true},
                {name: "gender", type: "varchar", isNullable: true},
                {name: "token", type: "varchar", isNullable: true},
                {name: "password", type: "varchar", isNullable: false},
                {name: "created_at", type: "timestamp"}
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("users");
    }

}
