import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { getConnection, Repository, SelectQueryBuilder } from 'typeorm';
import { updateReceiptDTO } from '../dtos/UpdateReceipt.dto';
import { Receipt } from '../entities/Receipt.entity';
import { createReceiptDTO } from './../dtos/CreateReceipt.dto';
import { User } from 'src/modules/user/entities/User.entity';
import { ReceiptProduct } from '../entities/ReceiptProduct.entity';
import { ReceiptProductOption } from '../entities/ReceiptProductOption.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
    private readonly i18n: I18nService,
  ) {}

  async getAllReceipt(searchOptions: any) {
    const join = {
      alias: 'receipt',
      leftJoinAndSelect: {
        receipt_product: 'receipt.receipt_products',
        receipt_product_options: 'receipt_product.receipt_product_options',
        product_option: 'receipt_product_options.product_option',
        value: 'product_option.value',
        user: 'receipt.user',
        product: 'product_option.product',
        product_img: 'product.images',
      },
    };

    const where = (qb: SelectQueryBuilder<Receipt>) => {
      // if (searchOptions.name) {
      //   qb.where('receipt.name LIKE :fullName', {
      //     fullName: `%${searchOptions.name}%`,
      //   });
      // }
    };

    return this.receiptRepository.findAndCount({
      join,
      where,
      order: {
        id: 'DESC',
      },
      skip: (searchOptions.page - 1) * searchOptions.limit,
      take: searchOptions.limit,
    });
  }

  async create(username: string, data: createReceiptDTO) {
    const { description, address, products } = data;
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    let total_price = 0;
    for (const product of products) {
      total_price += product.price;
    }

    let receipt = new Receipt();
    const user = await getConnection().manager.findOne(User, {
      where: { email: username },
    });
    Object.assign(receipt, {
      description: description || '',
      address: address || user.address,
      user,
      total_price,
    });
    try {
      //create receipt
      receipt = await queryRunner.manager.save(receipt);

      //create receipt product
      for (const product of products) {
        let receiptProduct = new ReceiptProduct();
        const receiptProductOptionData = [];
        Object.assign(receiptProduct, {
          receipt,
          unit_price: product.price,
          quantity: Number(product.quantity),
        });
        receiptProduct = await queryRunner.manager.save(receiptProduct);
        for (const productOptionId of product.productOptionId) {
          const productOption = await getConnection().manager.findOne(
            ProductOption,
            { where: { id: productOptionId } },
          );

          if (productOption) {
            let receiptProductOption = new ReceiptProductOption();

            Object.assign(receiptProductOption, {
              product_option: productOption,
              receipt_product: receiptProduct,
              quantity: 0,
            });

            receiptProductOption = await queryRunner.manager.save(
              receiptProductOption,
            );

            if (receiptProductOption) {
              receiptProductOptionData.push(receiptProductOption);
            }
          }
        }
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log('re', error.message);

      if (error instanceof HttpException) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, error.getStatus());
      } else {
        await queryRunner.rollbackTransaction();
        return false;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async update(receiptId: number, data: updateReceiptDTO) {
    const { description, address, products } = data;
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    let total_price = 0;
    for (const product of products) {
      const productOption = await getConnection().manager.findOne(
        ProductOption,
        { where: { product: { id: product.productOptionId } } },
      );
      total_price += productOption.price;
    }

    let receipt = await this.receiptRepository.findOne(receiptId);

    Object.assign(receipt, { description, address, total_price });
    try {
      //create receipt
      receipt = await queryRunner.manager.save(receipt);
      //create receipt product
      for (const product of products) {
        const receiptProduct = await getConnection().manager.findOne(
          ReceiptProduct,
          { where: { id: product.receiptProductId } },
        );
        const productOption = await getConnection().manager.findOne(
          ProductOption,
          { where: { product: { id: product.productOptionId } } },
        );
        Object.assign(receiptProduct, {
          receipt,
          product_option: productOption,
          quantity: Number(product.quantity),
        });
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      if (error instanceof HttpException) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, error.getStatus());
      } else {
        await queryRunner.rollbackTransaction();
        return false;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async delete(receiptId: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Receipt, { id: receiptId });
      await queryRunner.manager.delete(ReceiptProduct, {
        receipt: { id: receiptId },
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      if (error instanceof HttpException) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, error.getStatus());
      } else {
        await queryRunner.rollbackTransaction();
        return false;
      }
    } finally {
      await queryRunner.release();
    }
  }
}
