import { ReceiptProduct } from './../../receipt/entities/ReceiptProduct.entity';
import { Receipt } from './../../receipt/entities/Receipt.entity';
import { ROLES } from './../../../configs/roles';
import { Role } from './../entities/Role.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}
  asignUser(data: CreateUserDTO) {
    const {
      email,
      password,
      first_name,
      last_name,
      address,
      gender,
      avatar,
      phone,
      id_card,
      date_of_birth,
    } = data;
    const user = new User();
    Object.assign(user, {
      email,
      password,
      first_name,
      last_name,
      address,
      gender,
      avatar,
      phone,
      id_card,
      date_of_birth,
    });

    return user;
  }

  async findUser(options: FindOneOptions) {
    return await this.usersRepository.findOne(options);
    // return { email: 'user', password: 'ojsdofijsd' };
  }

  async findAdmin(options: FindOneOptions) {
    return await this.usersRepository.findOne(options);
    // return { email: 'admin', password: 'ojsdofijsd' };
  }

  async create(data: CreateUserDTO, isAdmin = false) {
    const user = this.asignUser(data);

    if (isAdmin) {
      const adminRole = await this.rolesRepository.findOne({
        where: { name: ROLES.USER },
      });
      user.role = adminRole;
    } else {
      const userRole = await this.rolesRepository.findOne({
        where: { name: ROLES.USER },
      });
      user.role = userRole;
    }

    return await this.usersRepository.save(user);
  }

  async update(userId: number, data: CreateUserDTO, isAdmin = false) {
    const dataUser = this.asignUser(data);
    const user = await this.usersRepository.findOne(userId);
    Object.assign(user, dataUser);

    if (isAdmin) {
      const adminRole = await this.rolesRepository.findOne({
        where: { name: ROLES.USER },
      });
      user.role = adminRole;
    } else {
      const userRole = await this.rolesRepository.findOne({
        where: { name: ROLES.USER },
      });
      user.role = userRole;
    }

    return await this.usersRepository.save(user);
  }

  async delete(userId: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Role, { users: { id: userId } });
      await queryRunner.manager.delete(Receipt, { user: { id: userId } });
      await queryRunner.manager.delete(ReceiptProduct, {
        receipt: { user: { id: userId } },
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      if (error instanceof HttpException) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(error.message, error.getStatus());
      } else {
        await queryRunner.rollbackTransaction();
        return false;
      }
    } finally {
      await queryRunner.release();
    }
  }
}
