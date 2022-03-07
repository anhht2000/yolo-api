import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as slug from 'slug';
import { User } from './User.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keys: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  async setPassword(keys: string) {
    this.keys = slug(this.name || keys);
  }
}
