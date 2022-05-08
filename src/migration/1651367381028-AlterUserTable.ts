import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUserTable1651367381028 implements MigrationInterface {
    name = 'AlterUserTable1651367381028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_89aa9ad39c2632ebc99ad935f1\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD \`productOptionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD CONSTRAINT \`FK_3bdb7ea14205ebbb70aef2a8add\` FOREIGN KEY (\`productOptionId\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP FOREIGN KEY \`FK_3bdb7ea14205ebbb70aef2a8add\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP COLUMN \`productOptionId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_89aa9ad39c2632ebc99ad935f1\` ON \`users\` (\`id_card\`)`);
    }

}
