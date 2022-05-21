import { ReceiptProduct } from './../../receipt/entities/ReceiptProduct.entity';
import { Receipt } from './../../receipt/entities/Receipt.entity';
import { ROLES } from './../../../configs/roles';
import { Role } from './../entities/Role.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../entities/User.entity';
import { I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import { Gender } from 'src/configs/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private readonly i18n: I18nService,
  ) {}
  asignUser(data: CreateUserDTO) {
    const {
      email,
      password,
      first_name,
      last_name,
      address,
      gender,
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
      gender: gender || Gender.MALE,
      phone,
      id_card: id_card || uuidv4(),
      date_of_birth: date_of_birth || new Date(),
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
        where: { name: ROLES.ADMIN },
      });
      const isExistEmail = await this.usersRepository.findOne({
        relations: ['role'],
        where: { email: data?.email, role: { id: 1 } },
      });

      const isExistPhone = await this.usersRepository.findOne({
        relations: ['role'],
        where: { phone: data?.phone, role: { id: 1 } },
      });
      console.log('isExistPhone', isExistPhone);

      if (isExistEmail) {
        throw new HttpException(
          await this.i18n.translate('user.EMAIL_EXISTED'),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (isExistPhone) {
        throw new HttpException(
          await this.i18n.translate('user.PHONE_EXISTED'),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      user.role = adminRole;
    } else {
      const userRole = await this.rolesRepository.findOne({
        where: { name: ROLES.USER },
      });
      const isExistEmail = await this.usersRepository.findOne({
        relations: ['role'],
        where: { email: data?.email, role: { id: 2 } },
      });
      const isExistPhone = await this.usersRepository.findOne({
        relations: ['role'],
        where: { phone: data?.phone, role: { id: 2 } },
      });

      if (isExistEmail) {
        throw new HttpException(
          await this.i18n.translate('user.EMAIL_EXISTED'),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (isExistPhone) {
        throw new HttpException(
          await this.i18n.translate('user.PHONE_EXISTED'),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

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
