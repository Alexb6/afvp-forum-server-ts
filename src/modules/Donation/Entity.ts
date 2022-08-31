import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { User } from '../User/Entity';
import { PaymentType } from '../PaymentType/Entity';

@Entity('donation')
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => User, (user) => user.donation, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.donation, {
    onDelete: 'SET NULL'
  })
  paymentType: PaymentType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
