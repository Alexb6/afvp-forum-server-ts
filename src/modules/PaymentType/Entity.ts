import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Donation } from '../Donation/Entity';
import { Membership } from '../Membership/Entity';

@Entity('payment_type')
export class PaymentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Donation, (donation) => donation.paymentType)
  donation: Donation;

  @OneToMany(() => Membership, (membership) => membership.paymentType)
  membership: Membership;
}
