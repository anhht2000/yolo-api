import { ReceiptProduct } from 'src/modules/receipt/entities/ReceiptProduct.entity';
import { ProductOption } from '../../option/entities/ProductOption.entity';
import { Product } from 'src/modules/product/entities/Product.entity';
import { User } from 'src/modules/user/entities/User.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Receipt } from './Receipt.entity';

@Entity('receipt_product_product_option')
export class ReceiptProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(
    () => ReceiptProduct,
    (receipt_product) => receipt_product.receipt_product_options,
  )
  receipt_product: ReceiptProduct;

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.receipt_product_options,
  )
  product_option: ProductOption;
}
