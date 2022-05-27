import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableReceiptProductOption1653607509016
  implements MigrationInterface
{
  name = 'AlterTableReceiptProductOption1653607509016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`option_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('color', 'text') NOT NULL DEFAULT 'text', UNIQUE INDEX \`IDX_9af1dbb97c2ad41d5c7f2118be\` (\`option_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`option_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`option_id\` int NULL, UNIQUE INDEX \`IDX_5283f174f6b451aa94e41e744b\` (\`value_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`product_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NOT NULL, \`fullpath\` varchar(255) NOT NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('draft', 'published', 'pending') NOT NULL DEFAULT 'published', \`label\` varchar(255) NOT NULL DEFAULT 'NEW', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_70b3f77ca8de13149b7f08d725\` (\`product_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refresh_token\` varchar(255) NOT NULL, \`exprired\` timestamp NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`keys\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`note\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_2ec1c94a977b940d85a4f498ae\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_code\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`avatar\` varchar(255) NULL, \`phone\` varchar(255) NOT NULL, \`id_card\` varchar(255) NOT NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`date_of_birth\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`role_id\` int NULL, UNIQUE INDEX \`IDX_23351656ab098559729ac15f50\` (\`user_code\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`receipts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`receipt_code\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_9187012ca5e2311a21d16a95d3\` (\`receipt_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`receipt_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`receipt_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    await queryRunner.query(
      `CREATE TABLE \`receipt_product_product_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`receiptProductId\` int NULL, \`productOptionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    // await queryRunner.query(
    //   `CREATE TABLE \`product_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`product_id\` int NULL, \`option_id\` int NULL, \`value_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`cart_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cart_id\` int NULL, \`product_option_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`receipts\` ADD CONSTRAINT \`FK_6f5a711d2591ddf19f9519900e9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`receipt_products\` ADD CONSTRAINT \`FK_70f8793e120f149feb7774bd88f\` FOREIGN KEY (\`receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`receipt_product_product_option\` ADD CONSTRAINT \`FK_54217633ff087b4dd7dcab50917\` FOREIGN KEY (\`receiptProductId\`) REFERENCES \`receipt_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`receipt_product_product_option\` ADD CONSTRAINT \`FK_528b3a5b55738c8b5698e70f4d1\` FOREIGN KEY (\`productOptionId\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_9f53e0e9868b4d64b048bff8701\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ab71ed3b21be5800905c621535\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`cart_products\` ADD CONSTRAINT \`FK_ebc4fe8eabf38786bb86cda0b9f\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`cart_products\` ADD CONSTRAINT \`FK_3647ff442f45a53bda7c4a8fa38\` FOREIGN KEY (\`product_option_id\`) REFERENCES \`product_option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart_products\` DROP FOREIGN KEY \`FK_3647ff442f45a53bda7c4a8fa38\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_products\` DROP FOREIGN KEY \`FK_ebc4fe8eabf38786bb86cda0b9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ab71ed3b21be5800905c621535\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_9f53e0e9868b4d64b048bff8701\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`receipt_product_product_option\` DROP FOREIGN KEY \`FK_528b3a5b55738c8b5698e70f4d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`receipt_product_product_option\` DROP FOREIGN KEY \`FK_54217633ff087b4dd7dcab50917\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`receipt_products\` DROP FOREIGN KEY \`FK_70f8793e120f149feb7774bd88f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`receipts\` DROP FOREIGN KEY \`FK_6f5a711d2591ddf19f9519900e9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``,
    );
    await queryRunner.query(`DROP TABLE \`cart_products\``);
    await queryRunner.query(`DROP TABLE \`product_option\``);
    await queryRunner.query(`DROP TABLE \`receipt_product_product_option\``);
    await queryRunner.query(`DROP TABLE \`receipt_products\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9187012ca5e2311a21d16a95d3\` ON \`receipts\``,
    );
    await queryRunner.query(`DROP TABLE \`receipts\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_23351656ab098559729ac15f50\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`REL_2ec1c94a977b940d85a4f498ae\` ON \`carts\``,
    );
    await queryRunner.query(`DROP TABLE \`carts\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_70b3f77ca8de13149b7f08d725\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`product_images\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5283f174f6b451aa94e41e744b\` ON \`option_values\``,
    );
    await queryRunner.query(`DROP TABLE \`option_values\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9af1dbb97c2ad41d5c7f2118be\` ON \`options\``,
    );
    await queryRunner.query(`DROP TABLE \`options\``);
  }
}
