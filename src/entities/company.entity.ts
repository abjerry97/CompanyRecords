import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id, {onDelete: 'CASCADE'}) 
  @JoinColumn()  
  user: User;

  @Column({ default: '' })
  name?: string;

  @Column({ default: '' })
  companyLogo?: string;

  @Column({ default: 0 })
  numberOfUsers?: number;

  @Column({ default: 0 })
  numberOfProducts?: number;
 
  @Column({ default: '' })
  percentage?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt?: Date;
  company: User;
}
