import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableAddStatusReceipt1653723909472 implements MigrationInterface {
    name = 'AlterTableAddStatusReceipt1653723909472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`status\` varchar(255) NULL DEFAULT 'waiting'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`status\``);
    }

}
