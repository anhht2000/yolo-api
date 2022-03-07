import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableReceipt1646650719892 implements MigrationInterface {
    name = 'CreateTableReceipt1646650719892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`receipts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`receipt_code\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_9187012ca5e2311a21d16a95d3\` (\`receipt_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD CONSTRAINT \`FK_6f5a711d2591ddf19f9519900e9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP FOREIGN KEY \`FK_6f5a711d2591ddf19f9519900e9\``);
        await queryRunner.query(`DROP INDEX \`IDX_9187012ca5e2311a21d16a95d3\` ON \`receipts\``);
        await queryRunner.query(`DROP TABLE \`receipts\``);
    }

}
