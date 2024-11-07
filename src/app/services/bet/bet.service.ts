import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tallies } from 'src/Database/tally.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Tallies)
        private readonly tallyRepository: Repository<Tallies>
    ) {}

    async createBet(createBetDTO: Tallies): Promise<any> {
        const bet = await this.tallyRepository.save(createBetDTO);

        return {
            statusCode: 200,
            message: 'Bet created successfully',
            bet: bet,
        }
    }
}
