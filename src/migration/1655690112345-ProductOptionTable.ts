import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductOptionTable1655690112345 implements MigrationInterface {
    name = 'ProductOptionTable1655690112345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD \`number\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP COLUMN \`number\``);
    }

}
