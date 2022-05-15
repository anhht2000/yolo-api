import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTypeToOptionTable1652605785769 implements MigrationInterface {
    name = 'AddTypeToOptionTable1652605785769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`options\` ADD \`type\` enum ('color', 'text') NOT NULL DEFAULT 'text'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`label\` \`label\` varchar(255) NOT NULL DEFAULT 'NEW'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`label\` \`label\` varchar(255) NOT NULL DEFAULT '["NEW"]'`);
        await queryRunner.query(`ALTER TABLE \`options\` DROP COLUMN \`type\``);
    }

}
