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

@Entity('product_option')
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.product_options)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Option, (option) => option.product_options)
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @ManyToOne(() => OptionValue, (value) => value.product_options)
  @JoinColumn({ name: 'value_id' })
  value: OptionValue;

  @ManyToMany(() => Cart, (carts) => carts.product_options)
  carts: Cart[];

  @OneToMany(
    () => ReceiptProduct,
    (receipt_product) => receipt_product.product_option,
  )
  @JoinColumn({ name: 'receipt_product_id' })
  receipt_products: ReceiptProduct[];
}
