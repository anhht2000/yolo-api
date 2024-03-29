import { Product } from 'src/modules/product/entities/Product.entity';
import { User } from 'src/modules/user/entities/User.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Receipt } from './Receipt.entity';

@Entity('receipt_products')
export class ReceiptProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.receipt_products)
  @JoinColumn({ name: 'receipt_id' })
  receipt: Receipt;

  @OneToMany(() => Product, (product) => product.receipt_product)
  products: Product[];
}
