import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterRelationCart1651337937589 implements MigrationInterface {
    name = 'AlterRelationCart1651337937589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cart_id\` int NULL, \`product_option_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`cart_products\` ADD CONSTRAINT \`FK_ebc4fe8eabf38786bb86cda0b9f\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_products\` ADD CONSTRAINT \`FK_3647ff442f45a53bda7c4a8fa38\` FOREIGN KEY (\`product_option_id\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_products\` DROP FOREIGN KEY \`FK_3647ff442f45a53bda7c4a8fa38\``);
        await queryRunner.query(`ALTER TABLE \`cart_products\` DROP FOREIGN KEY \`FK_ebc4fe8eabf38786bb86cda0b9f\``);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`cart_products\``);
    }

}
