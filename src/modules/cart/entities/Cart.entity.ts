import { ProductLabel } from '../../../configs/product';
import * as slug from 'slug';
import { ProductStatus } from 'src/configs/product';
import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import { ReceiptProduct } from 'src/modules/receipt/entities/ReceiptProduct.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/User.entity';
import { CartProduct } from './CartProduct.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((cart_product) => CartProduct, (user) => user.cart)
  cart_products: CartProduct[];
}
