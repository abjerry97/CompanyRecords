import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  
  name?: string;
  @Column({ default: '' })
  email?: string;

  @Column({ default: '' })
  uid?: string;

  @Column({ default: '' })
  profilePic?: string;

  @Column({ default: 0 })
  status?: number;

  @Column('varchar', { array: true, nullable: true, default: [] })
  roles?: string[]; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt?: Date;
}
