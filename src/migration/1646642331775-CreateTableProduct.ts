import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableProduct1646642331775 implements MigrationInterface {
    name = 'CreateTableProduct1646642331775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_70b3f77ca8de13149b7f08d725\` (\`product_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_23351656ab098559729ac15f50\` (\`user_code\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_23351656ab098559729ac15f50\``);
        await queryRunner.query(`DROP INDEX \`IDX_70b3f77ca8de13149b7f08d725\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
