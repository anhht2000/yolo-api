import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableReceipt1655513453665 implements MigrationInterface {
    name = 'AlterTableReceipt1655513453665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`method\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`method\``);
    }

}
