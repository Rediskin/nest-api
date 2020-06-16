import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createUserMasterDataTable1592337531189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user_master_data",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {name: "location", type: "varchar", isNullable: true},
                {name: "city", type: "varchar", isNullable: true},
                {name: "post_code", type: "int", isNullable: true},
                {name: "street", type: "varchar", isNullable: true},
                {name: "house_number", type: "varchar", isNullable: true},
                {name: "apartments", type: "int", isNullable: true},
                {name: "card_number", type: "int", isNullable: true},
                {name: "card_month", type: "varchar", isNullable: true},
                {name: "card_year", type: "int", isNullable: true},
                {name: "delivery_office_number", type: "int", isNullable: true},
                {name: "delivery_office_address", type: "varchar", isNullable: true},
                {name: "delivery_office_city", type: "varchar", isNullable: true},
                {name: "phone_number", type: "varchar", isNullable: true},
                {name: "fax_number", type: "varchar", isNullable: true},
            ]
        }));
        await queryRunner.addColumn("users", new TableColumn({
            name: "master_data_id",
            type: "int",
            isNullable: true,
            default: null
        }))
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["master_data_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_master_data",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("master_data_id") !== 1);
        await queryRunner.dropForeignKey("users", foreignKey);
        await queryRunner.dropColumn("users", "master_data_id")
        await queryRunner.dropTable("user_master_data");
    }


}
