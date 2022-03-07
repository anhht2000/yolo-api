import * as slug from 'slug';
import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import { ReceiptProduct } from 'src/modules/receipt/entities/ReceiptProduct.entity';
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
import { ProductImage } from './ProductImage.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  product_code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductOption, (product_option) => product_option.product)
  product_options: ProductOption[];

  @ManyToOne(
    () => ReceiptProduct,
    (receipt_product) => receipt_product.products,
  )
  @JoinColumn({ name: 'receipt_product_id' })
  receipt_product: ReceiptProduct;

  @BeforeInsert()
  async setCode(name: string) {
    this.product_code = slug(this.name || name);
  }
}
