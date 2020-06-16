import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

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
                {name: "card_month", type: "int", isNullable: true},
                {name: "card_year", type: "int", isNullable: true},
                {name: "delivery_office_number", type: "int", isNullable: true},
                {name: "delivery_office_address", type: "varchar", isNullable: true},
                {name: "delivery_office_city", type: "varchar", isNullable: true},
                {name: "phone_number", type: "varchar", isNullable: true},
                {name: "fax_number", type: "varchar", isNullable: true},
                {name: "user_id", type: "int", isNullable: false},
            ]
        }));

        await queryRunner.createForeignKey("user_master_data", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user_master_data");
    }


}
