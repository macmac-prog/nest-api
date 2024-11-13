import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBetDto {
    @IsUUID()
    @IsNotEmpty({ message: 'User is required' })
    user_id: string;

    @IsUUID()
    @IsNotEmpty({ message: 'User is required' })
    enemy_id: string;

    @IsNumber()
    @IsNotEmpty({ message: 'User team is required' })
    user_team: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Enemy team is required' })
    enemy_team: number;

    @IsString()
    @IsNotEmpty({ message: 'Bet is required' })
    bet: string;
}