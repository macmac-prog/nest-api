import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Wallets } from './wallet.entity';
import { Tallies } from './tally.entity';

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  date_of_birth?: Date;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email_verified_at?: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  remember_token?: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;

  @OneToMany(() => Wallets, wallets => wallets.user)
  wallets: Wallets[];
  
  @OneToMany(() => Tallies, tallies => tallies.userID)
  userIDTallies: Tallies[];

  @OneToMany(() => Tallies, tallies => tallies.enemyID)
  enemyIDTallies: Tallies[];
}