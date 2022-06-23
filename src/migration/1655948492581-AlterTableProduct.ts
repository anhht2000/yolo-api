import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableProduct1655948492581 implements MigrationInterface {
    name = 'AlterTableProduct1655948492581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
