/* eslint-disable @typescript-eslint/no-inferrable-types */
import { OptionValue } from 'src/modules/option/entities/OptionValue.entity';
import { ProductOption } from './../../option/entities/ProductOption.entity';
/* eslint-disable prefer-const */
import { ProductLabel } from './../../../configs/product';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { GetAllProductOption } from 'src/configs/product';
import {
  FindOneOptions,
  getConnection,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { updateProductDTO } from '../dtos/UpdateProduct.dto';
import { Product } from '../entities/Product.entity';
import { createProductDTO } from './../dtos/CreateProduct.dto';
import { ProductImage } from '../entities/ProductImage.entity';
import { Option } from 'src/modules/option/entities/Option.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly i18n: I18nService,
  ) {}
  async asignProduct(
    data: createProductDTO | updateProductDTO,
    isUpdate: boolean = false,
    productId: number,
  ) {
    const { name, description, label, status, options, images } = data;
    let product;

    if (!isUpdate) {
      product = new Product();
    } else {
      product = await this.productRepository.findOne(productId);
    }
    Object.assign(product, {
      name,
      description,
      label: label || ProductLabel.NEW,
      status,
    });
    return product;
  }

  findOne(options: FindOneOptions) {
    return this.productRepository.findOne(options);
  }

  async getAllProduct(searchOptions: GetAllProductOption) {
    const join = {
      alias: 'product',
      // leftJoinAndSelect: {
      //   value: 'option.values',
      // },
    };

    const where = (qb: SelectQueryBuilder<Product>) => {
      if (searchOptions.name) {
        qb.where('product.name LIKE :fullName', {
          fullName: `%${searchOptions.name}%`,
        });
      }
    };

    return this.productRepository.findAndCount({
      join,
      relations: [
        'images',
        'product_options',
        'product_options.option',
        'product_options.value',
      ],
      where,
      order: {
        id: 'DESC',
      },
      skip: (searchOptions.page - 1) * searchOptions.limit,
      take: searchOptions.limit,
    });
  }

  async update(productId: number, data: updateProductDTO) {
    let product = await this.asignProduct(data, true, productId);
    const { options, images } = data;
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      //create product
      product = await queryRunner.manager.save(product);
      //create product image
      for (const image of JSON.parse(images)) {
        const { path, id } = image;
        const dataImage = await queryRunner.manager.findOne(ProductImage, {
          where: { id: id },
        });
        const data: Partial<ProductImage> = {
          path: path,
          fullpath: path,
          product,
        };
        Object.assign(dataImage, data);
        await queryRunner.manager.save(dataImage);
      }
      //create product option
      for (const optionData of JSON.parse(options)) {
        const { valueId, optionId, price, productOtionId } = optionData;
        const value = await queryRunner.manager.findOne(OptionValue, {
          where: { id: valueId },
        });
        const option = await queryRunner.manager.findOne(Option, {
          where: { id: optionId },
        });
        const productOtion = await queryRunner.manager.findOne(ProductOption, {
          where: { id: productOtionId },
        });
        const data: Partial<ProductOption> = {
          value,
          option,
          product,
          price,
        };
        Object.assign(productOtion, data);
        await queryRunner.manager.save(productOtion);
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

  async delete(productId: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(ProductOption, { product: productId });
      await queryRunner.manager.delete(ProductImage, { product: productId });
      await queryRunner.manager.delete(Product, { id: productId });
      await queryRunner.commitTransaction();
      return true;
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

  async create(data: createProductDTO) {
    let product = await this.asignProduct(data, false, null);
    const { options, images } = data;

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      //create product
      product = await queryRunner.manager.save(product);

      //create product image
      for (const image of JSON.parse(images)) {
        const data: Partial<ProductImage> = {
          path: image,
          fullpath: image,
          product,
        };
        const dataImage = new ProductImage();
        Object.assign(dataImage, data);
        await queryRunner.manager.save(dataImage);
      }

      //create product option
      for (const optionData of JSON.parse(options)) {
        const { valueId, optionId, price } = optionData;
        const value = await queryRunner.manager.findOne(OptionValue, {
          where: { id: valueId },
        });
        const option = await queryRunner.manager.findOne(Option, {
          where: { id: optionId },
        });
        const data: Partial<ProductOption> = {
          value,
          option,
          product,
          price,
        };
        const dataOption = new ProductOption();
        Object.assign(dataOption, data);
        await queryRunner.manager.save(dataOption);
      }

      await queryRunner.commitTransaction();

      return true;
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
