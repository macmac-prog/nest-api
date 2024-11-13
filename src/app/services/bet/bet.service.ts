import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBetDto } from 'src/app/Validation/create-bet.dto';
import { Tallies } from 'src/Database/tally.entity';
import { Teams } from 'src/Database/teams.entity';
import { Users } from 'src/Database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Tallies) private readonly talliesRepository: Repository<Tallies>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @InjectRepository(Teams) private readonly teamsRepository: Repository<Teams>,
  ) {}

  async createBet(createBetDto: CreateBetDto): Promise<Tallies> {
    const { user_id, enemy_id, user_team, enemy_team, bet } = createBetDto;

    // Fetch the necessary data to populate the relations (e.g., Users, Teams)
    const user = await this.usersRepository.findOne({ where: { id: user_id } });
    const enemy = await this.usersRepository.findOne({ where: { id: enemy_id } });
    const userTeam = await this.teamsRepository.findOne({ where: { id: user_team } });
    const enemyTeam = await this.teamsRepository.findOne({ where: { id: enemy_team } });

    if (!user || !enemy || !userTeam || !enemyTeam) {
      throw new Error('Invalid user or team data');
    }

    // Map CreateBetDto to Tallies entity
    const tally = new Tallies();
    tally.userID = user; // Assign the User entity
    tally.enemyID = enemy; // Assign the Enemy User entity
    tally.userTeam = userTeam; // Assign the User Team entity
    tally.enemyTeam = enemyTeam; // Assign the Enemy Team entity
    tally.bet = bet;

    // Save the entity
    return await this.talliesRepository.save(tally);
  }
}
