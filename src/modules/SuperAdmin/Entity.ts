import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../User/Entity';

@Entity('super_admin')
export class SuperAdmin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
