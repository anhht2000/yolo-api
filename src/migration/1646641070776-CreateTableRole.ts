import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRole1646641070776 implements MigrationInterface {
  name = 'CreateTableRole1646641070776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`keys\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
