import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableOptionValue1646645450013 implements MigrationInterface {
    name = 'CreateTableOptionValue1646645450013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`option_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`option_id\` int NULL, UNIQUE INDEX \`IDX_5283f174f6b451aa94e41e744b\` (\`value_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`DROP INDEX \`IDX_5283f174f6b451aa94e41e744b\` ON \`option_values\``);
        await queryRunner.query(`DROP TABLE \`option_values\``);
    }

}
