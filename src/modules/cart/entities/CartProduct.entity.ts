import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart.entity';

@Entity('cart_products')
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.cart_products)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(
    () => ProductOption,
    (product_option) => product_option.cart_products,
  )
  @JoinColumn({ name: 'product_option_id' })
  product_option: ProductOption;
}
