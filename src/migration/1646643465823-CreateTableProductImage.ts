import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableProductImage1646643465823 implements MigrationInterface {
    name = 'CreateTableProductImage1646643465823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NOT NULL, \`fullpath\` varchar(255) NOT NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`DROP TABLE \`product_images\``);
    }

}
