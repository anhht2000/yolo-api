import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(options: FindOneOptions) {
    // return await this.usersRepository.findOne(options);
    return { email: 'user', password: 'ojsdofijsd' };
  }

  async findAdmin(options: FindOneOptions) {
    // return await this.usersRepository.findOne(options);
    return { email: 'admin', password: 'ojsdofijsd' };
  }
}
