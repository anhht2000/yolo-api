import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableOption1646644611665 implements MigrationInterface {
    name = 'CreateTableOption1646644611665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`option_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9af1dbb97c2ad41d5c7f2118be\` (\`option_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9af1dbb97c2ad41d5c7f2118be\` ON \`options\``);
        await queryRunner.query(`DROP TABLE \`options\``);
    }

}
