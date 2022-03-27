import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumProductTable1648346069205 implements MigrationInterface {
  name = 'AddColumProductTable1648346069205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`status\` enum ('SELLOUT', 'PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`label\` enum ('BESTSELLER', 'POPULAR', 'NEW') NOT NULL DEFAULT 'NEW'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`label\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`status\``);
  }
}
