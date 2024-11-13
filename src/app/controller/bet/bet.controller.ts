import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/Middleware/jwt-auth.guard';
import { BetService } from 'src/app/services/bet/bet.service';
import { CreateBetDto } from 'src/app/Validation/create-bet.dto';
import { Tallies } from 'src/Database/tally.entity';

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-bet')
  async createBet(@Body() createBetDto: CreateBetDto): Promise<Tallies> {
    return this.betService.createBet(createBetDto);
  }
}
