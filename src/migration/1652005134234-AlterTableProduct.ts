import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableProduct1652005134234 implements MigrationInterface {
    name = 'AlterTableProduct1652005134234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`label\` varchar(255) NOT NULL DEFAULT '["NEW"]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`label\` enum ('BESTSELLER', 'POPULAR', 'NEW') NOT NULL DEFAULT 'NEW'`);
    }

}
