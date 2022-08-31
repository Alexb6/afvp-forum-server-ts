import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Country } from '../Country/Entity';
import { Donation } from '../Donation/Entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  passwordConfirm: string;

  @Column({ nullable: true })
  passwordChangedDt: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpiredDt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  photoUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  addressLine01: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  addressLine02: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  addressLine03: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firm: string;

  @ManyToOne(() => Country, (country) => country.user, { onDelete: 'SET NULL' })
  country: Country;

  @OneToMany(() => Donation, (donation) => donation.user)
  donation: Donation;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
