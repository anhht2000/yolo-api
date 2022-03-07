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
import { ProductOption } from './ProductOption.entity';

@Entity('option_values')
export class OptionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value_code: string;

  @Column()
  name: string;

  @ManyToOne(() => Option, (option) => option.values)
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @OneToMany(() => ProductOption, (product_option) => product_option.value)
  product_options: ProductOption[];

  @BeforeInsert()
  setCode(name: string) {
    this.value_code = slug(this.name || name);
  }
}
