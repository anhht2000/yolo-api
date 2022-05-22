import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOptionTable1653184155662 implements MigrationInterface {
    name = 'UpdateOptionTable1653184155662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ab71ed3b21be5800905c621535\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_9f53e0e9868b4d64b048bff8701\``);
        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_9f53e0e9868b4d64b048bff8701\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ab71ed3b21be5800905c621535\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ab71ed3b21be5800905c621535\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_9f53e0e9868b4d64b048bff8701\``);
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_9f53e0e9868b4d64b048bff8701\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ab71ed3b21be5800905c621535\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
