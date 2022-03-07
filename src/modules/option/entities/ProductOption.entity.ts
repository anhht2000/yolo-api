import { OptionValue } from './OptionValue.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as slug from 'slug';
import { Option } from './Option.entity';
import { Product } from 'src/modules/product/entities/Product.entity';

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
}
