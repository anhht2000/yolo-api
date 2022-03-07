import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refresh_token: string;

  @Column({ type: 'timestamp' })
  exprired: Date;

  @ManyToOne(() => User, (user) => user.refresh_token)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
