import { ProductOption } from './../../option/entities/ProductOption.entity';
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
import { ReceiptProductOption } from './ReceiptProductOption.entity';

@Entity('receipt_products')
export class ReceiptProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.receipt_products)
  @JoinColumn({ name: 'receipt_id' })
  receipt: Receipt;

  @OneToMany(
    () => ReceiptProductOption,
    (receiptproductOption) => receiptproductOption.receipt_product,
  )
  receipt_product_options: ReceiptProductOption[];
}
