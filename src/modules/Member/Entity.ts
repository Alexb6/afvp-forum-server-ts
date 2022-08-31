import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from '../User/Entity';
import { Role } from '../Role/Entity';
import { MembershipType } from '../MembershipType/Entity';
import { Membership } from '../Membership/Entity';

export enum RegistrationStatus {
  TOVALIDATE = 'toValidate',
  VALIDATED = 'validated',
  REGISTERED = 'registered',
  REJECTED = 'rejected'
}

@Entity('member')
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  speciality: string;

  @Column({ type: 'longtext', nullable: true })
  biography: string;

  @Column({ type: 'mediumtext', nullable: true })
  hobby: string;

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.TOVALIDATE
  })
  registrationStatus: RegistrationStatus;

  @Column({ type: 'datetime', nullable: true })
  subscriptionDt: Date;

  @Column({ type: 'datetime', nullable: true })
  activeLimitDt: Date;

  @Column({ type: 'datetime', nullable: true })
  reactivationDt: Date;

  @Column({ type: 'boolean', nullable: true })
  isBoardMember: boolean;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Role, (role) => role.member, { onDelete: 'SET NULL' })
  role: Role;

  @ManyToOne(() => MembershipType, (membershipType) => membershipType.member, {
    onDelete: 'SET NULL'
  })
  membershipType: MembershipType;

  @OneToMany(() => Membership, (membership) => membership.member)
  membership: Membership;
}
