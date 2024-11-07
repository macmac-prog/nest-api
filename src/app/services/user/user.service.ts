import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../../Database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../Validation/create-user.dto';
import { Wallets } from '../../../Database/wallet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Wallets)
    private readonly walletRepository: Repository<Wallets>,
  ) {}
  
  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await queryRunner.manager.save(user);

      const wallet = this.walletRepository.create({
        user: savedUser
      });

      await queryRunner.manager.save(wallet);
      await queryRunner.commitTransaction();

      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findOne(id: string): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findById(id: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUserName(username: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByRememberToken(
    remember_token: string,
  ): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { remember_token } });
  }

  async save(user: Users): Promise<Users> {
    return this.userRepository.save(user);
  }
}
