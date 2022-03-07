import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableProductOption1646647740982 implements MigrationInterface {
    name = 'CreateTableProductOption1646647740982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`product_id\` int NULL, \`option_id\` int NULL, \`value_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_9f53e0e9868b4d64b048bff8701\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ab71ed3b21be5800905c621535\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ab71ed3b21be5800905c621535\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_9f53e0e9868b4d64b048bff8701\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``);
        await queryRunner.query(`DROP TABLE \`product_option\``);
    }

}
