import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusUserTable1648866705935 implements MigrationInterface {
    name = 'AddStatusUserTable1648866705935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    }

}
