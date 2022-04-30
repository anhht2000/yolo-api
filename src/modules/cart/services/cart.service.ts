/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { FindOneOptions, Repository } from 'typeorm';
import { Cart } from '../entities/Cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly i18n: I18nService,
  ) {}
  // async asignCart(
  //   data: createProductDTO | updateProductDTO,
  //   isUpdate: boolean = false,
  //   productId: number,
  // ) {
  //   const { name, description, label, status, options, images } = data;
  //   let product;

  //   if (!isUpdate) {
  //     product = new Product();
  //   } else {
  //     product = await this.cartRepository.findOne(productId);
  //   }
  //   Object.assign(product, {
  //     name,
  //     description,
  //     label: label || ProductLabel.NEW,
  //     status,
  //   });
  //   return product;
  // }

  findOne(options: FindOneOptions) {
    return this.cartRepository.findOne(options);
  }
}
