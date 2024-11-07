import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Wallets } from './wallet.entity';
import { Teams } from './teams.entity';

@Entity('tallies')
export class Tallies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  enemy_id: string;

  @ManyToOne(() => Users, (user) => user.userIDTallies)
  @JoinColumn({ name: 'user_id' })
  userID: Users;

  @ManyToOne(() => Users, (enemy) => enemy.enemyIDTallies)
  @JoinColumn({ name: 'enemy_id' })
  enemyID: Users;

  @Column()
  user_team: string;

  @Column()
  enemy_team: string;

  @ManyToOne(() => Teams, (team) => team.userTeamTallies)
  @JoinColumn({ name: 'user_team' })
  userTeam: Teams;

  @ManyToOne(() => Teams, (team) => team.enemyTeamTallies)
  @JoinColumn({ name: 'enemy_team' })
  enemyTeam: Teams;

  @Column()
  bet: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;
}
