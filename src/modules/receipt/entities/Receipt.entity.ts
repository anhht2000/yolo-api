import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
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
import { ReceiptProduct } from './ReceiptProduct.entity';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  receipt_code: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  total_price: number;

  @ManyToOne(() => User, (user) => user.receipts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ReceiptProduct, (receipt_product) => receipt_product.receipt)
  receipt_products: ReceiptProduct[];

  @BeforeInsert()
  setCode(name: string) {
    this.receipt_code = uuidv4();
  }
}
