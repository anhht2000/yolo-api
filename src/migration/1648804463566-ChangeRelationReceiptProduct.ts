import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeRelationReceiptProduct1648804463566 implements MigrationInterface {
    name = 'ChangeRelationReceiptProduct1648804463566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_d1bdb4a1249f6a6723dc21ac4c4\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`receipt_product_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`receipt_product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_d1bdb4a1249f6a6723dc21ac4c4\` FOREIGN KEY (\`receipt_product_id\`) REFERENCES \`receipt_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
