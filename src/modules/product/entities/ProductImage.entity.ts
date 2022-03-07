import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  fullpath: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
