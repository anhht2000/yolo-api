import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterStatusProduct1652003409993 implements MigrationInterface {
    name = 'AlterStatusProduct1652003409993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`status\` \`status\` enum ('draft', 'published', 'pending') NOT NULL DEFAULT 'published'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`status\` \`status\` enum ('SELLOUT', 'PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC'`);
    }

}
