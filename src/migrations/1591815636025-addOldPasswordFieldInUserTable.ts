import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addOldPasswordFieldInUserTable1591815636025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "old_password",
            type: "varchar",
            isNullable: true,
            default: null
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("users", "old_password");
    }

}
