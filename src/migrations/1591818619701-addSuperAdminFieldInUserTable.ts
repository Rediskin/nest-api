import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSuperAdminFieldInUserTable1591818619701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "super_admin",
            type: "boolean",
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("users", "super_admin");
    }

}
