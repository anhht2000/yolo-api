import { OptionValue } from './OptionValue.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as slug from 'slug';
import { ProductOption } from './ProductOption.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  option_code: string;

  @Column()
  name: string;

  @OneToMany(() => OptionValue, (value) => value.option)
  values: OptionValue[];

  @OneToMany(() => ProductOption, (product_option) => product_option.option)
  product_options: ProductOption[];

  @BeforeInsert()
  setCode(name: string) {
    this.option_code = slug(this.name || name);
  }
}
