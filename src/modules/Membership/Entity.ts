import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Member } from '../Member/Entity';
import { MembershipType } from '../MembershipType/Entity';
import { PaymentType } from '../PaymentType/Entity';

@Entity('membership')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => Member, (member) => member.membership, {
    onDelete: 'CASCADE'
  })
  member: Member;

  @ManyToOne(
    () => MembershipType,
    (membershipType) => membershipType.membership,
    { onDelete: 'SET NULL' }
  )
  membershipType: MembershipType;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.membership, {
    onDelete: 'SET NULL'
  })
  paymentType: PaymentType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
