import * as bcrypt from 'bcrypt';
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
import { Gender } from '../interfaces';
import { Receipt } from './../../receipt/entities/Receipt.entity';
import { RefreshToken } from './RefeshToken.entity';
import { Role } from './Role.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_code: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  id_card: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => RefreshToken, (refresh_token) => refresh_token.user)
  refresh_token: RefreshToken[];

  @OneToMany(() => Receipt, (receipt) => receipt.user)
  receipts: Receipt[];

  // @ManyToMany(() => Building, (building) => building.users)
  // @JoinTable({
  //   name: 'user_building',
  //   joinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'building_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // buildings: Building[];

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable({
  //   name: 'user_role',
  //   joinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'role_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // roles: Role[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password || this.password, salt);
    this.password = hash;
    this.user_code = uuidv4();
  }
}
