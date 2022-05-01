import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCartTable1651334306574 implements MigrationInterface {
    name = 'CreateCartTable1651334306574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`note\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_2ec1c94a977b940d85a4f498ae\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carts_product_options_product_option\` (\`cartsId\` int NOT NULL, \`productOptionId\` int NOT NULL, INDEX \`IDX_56a5d21f20c43500ebdfae41cc\` (\`cartsId\`), INDEX \`IDX_5d41d0662ae91229b34b1c31f1\` (\`productOptionId\`), PRIMARY KEY (\`cartsId\`, \`productOptionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts_product_options_product_option\` ADD CONSTRAINT \`FK_56a5d21f20c43500ebdfae41ccf\` FOREIGN KEY (\`cartsId\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`carts_product_options_product_option\` ADD CONSTRAINT \`FK_5d41d0662ae91229b34b1c31f1e\` FOREIGN KEY (\`productOptionId\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carts_product_options_product_option\` DROP FOREIGN KEY \`FK_5d41d0662ae91229b34b1c31f1e\``);
        await queryRunner.query(`ALTER TABLE \`carts_product_options_product_option\` DROP FOREIGN KEY \`FK_56a5d21f20c43500ebdfae41ccf\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        await queryRunner.query(`ALTER TABLE \`receipt_products\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d41d0662ae91229b34b1c31f1\` ON \`carts_product_options_product_option\``);
        await queryRunner.query(`DROP INDEX \`IDX_56a5d21f20c43500ebdfae41cc\` ON \`carts_product_options_product_option\``);
        await queryRunner.query(`DROP TABLE \`carts_product_options_product_option\``);
        await queryRunner.query(`DROP INDEX \`REL_2ec1c94a977b940d85a4f498ae\` ON \`carts\``);
        await queryRunner.query(`DROP TABLE \`carts\``);
    }

}
