import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableAddDate1653723525515 implements MigrationInterface {
    name = 'AlterTableAddDate1653723525515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP FOREIGN KEY \`FK_3bdb7ea14205ebbb70aef2a8add\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP COLUMN \`productOptionId\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` CHANGE \`unit_price\` \`unit_price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt_product_product_option\` ADD CONSTRAINT \`FK_54217633ff087b4dd7dcab50917\` FOREIGN KEY (\`receiptProductId\`) REFERENCES \`receipt_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receipt_product_product_option\` ADD CONSTRAINT \`FK_528b3a5b55738c8b5698e70f4d1\` FOREIGN KEY (\`productOptionId\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt_product_product_option\` DROP FOREIGN KEY \`FK_528b3a5b55738c8b5698e70f4d1\``);
        await queryRunner.query(`ALTER TABLE \`receipt_product_product_option\` DROP FOREIGN KEY \`FK_54217633ff087b4dd7dcab50917\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` CHANGE \`unit_price\` \`unit_price\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD \`productOptionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD CONSTRAINT \`FK_3bdb7ea14205ebbb70aef2a8add\` FOREIGN KEY (\`productOptionId\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
