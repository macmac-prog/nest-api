import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tallies } from "./tally.entity";

@Entity("teams")
export class Teams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at?: Date;
  
    @OneToMany(() => Tallies, tallies => tallies.userTeam)
    userTeamTallies: Tallies[];

    @OneToMany(() => Tallies, tallies => tallies.enemyTeam)
    enemyTeamTallies: Tallies[];
}