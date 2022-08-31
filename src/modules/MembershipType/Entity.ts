import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Member } from '../Member/Entity';
import { Membership } from '../Membership/Entity';

@Entity('membership_type')
export class MembershipType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Member, (member) => member.membershipType)
  member: Member;

  @OneToMany(() => Membership, (membership) => membership.membershipType)
  membership: Membership;
}
