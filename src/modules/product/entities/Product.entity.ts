import { ProductLabel } from './../../../configs/product';
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

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.PUBLIC,
  })
  status: ProductStatus;

  @Column({
    type: 'enum',
    enum: ProductLabel,
    default: ProductLabel.NEW,
  })
  label: ProductLabel;

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

  @BeforeInsert()
  async setCode(name: string) {
    this.product_code = slug(this.name || name);
  }
}
