import { OptionValue } from './OptionValue.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as slug from 'slug';
import { Option } from './Option.entity';
import { Product } from 'src/modules/product/entities/Product.entity';
import { ReceiptProduct } from 'src/modules/receipt/entities/ReceiptProduct.entity';
import { Cart } from 'src/modules/cart/entities/Cart.entity';
import { CartProduct } from 'src/modules/cart/entities/CartProduct.entity';
import { ReceiptProductOption } from 'src/modules/receipt/entities/ReceiptProductOption.entity';

@Entity('product_option')
export class ProductOption {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.product_options)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.product_options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @ManyToOne(() => OptionValue, (value) => value.product_options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'value_id' })
  value: OptionValue;

  @OneToMany(() => CartProduct, (cart_product) => cart_product.product_option, {
    onDelete: 'CASCADE',
  })
  cart_products: CartProduct[];

  @OneToMany(
    () => ReceiptProductOption,
    (receipt_product) => receipt_product.product_option,
  )
  receipt_product_options: ReceiptProductOption[];
}
