import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableReceiptOption1646651733522 implements MigrationInterface {
    name = 'CreateTableReceiptOption1646651733522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`receipt_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`receipt_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`receipt_product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD CONSTRAINT \`FK_70f8793e120f149feb7774bd88f\` FOREIGN KEY (\`receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_d1bdb4a1249f6a6723dc21ac4c4\` FOREIGN KEY (\`receipt_product_id\`) REFERENCES \`receipt_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_d1bdb4a1249f6a6723dc21ac4c4\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP FOREIGN KEY \`FK_70f8793e120f149feb7774bd88f\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`receipt_product_id\``);
        await queryRunner.query(`DROP TABLE \`receipt_products\``);
    }

}
