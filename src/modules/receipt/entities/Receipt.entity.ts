import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import { User } from 'src/modules/user/entities/User.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  method: string;

  @Column()
  total_price: number;

  @Column({ default: 'waiting', nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.receipts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ReceiptProduct, (receipt_product) => receipt_product.receipt)
  receipt_products: ReceiptProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  setCode(name: string) {
    this.receipt_code = uuidv4();
  }
}
