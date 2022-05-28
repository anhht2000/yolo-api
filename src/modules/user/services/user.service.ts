import { ChangeStatusDTO } from './../dtos/ChangeStatus.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Gender } from 'src/configs/enum';
import { User } from 'src/modules/user/entities/User.entity';
import {
  FindOneOptions,
  getConnection,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ROLES } from './../../../configs/roles';
import { Receipt } from './../../receipt/entities/Receipt.entity';
import { ReceiptProduct } from './../../receipt/entities/ReceiptProduct.entity';
import { Role } from './../entities/Role.entity';

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

  async findAllUser(limit: number, page: number, options?: any) {
    const join = {
      alias: 'user',
      leftJoinAndSelect: {
        receipt: 'user.receipts',
        // receipt_product_options: 'receipt_product.receipt_product_options',
        // product_option: 'receipt_product_options.product_option',
        // value: 'product_option.value',
        // user: 'receipt.user',
        // product: 'product_option.product',
        // product_img: 'product.images',
      },
    };

    const where = (qb: SelectQueryBuilder<User>) => {
      if (!!options.name) {
        // qb.andWhere(
        //   "CONCAT(user.first_name, ' ', user.last_name) LIKE :fullName",
        //   { fullName: `%${options.name}%` },
        // );
        qb.andWhere('user.email LIKE :fullName', {
          fullName: `%${options.name}%`,
        });
      }
    };

    return this.usersRepository.findAndCount({
      join,
      where,
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
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

  async changeStatus(userId: number, data: ChangeStatusDTO) {
    const user = await this.usersRepository.findOne(userId);
    Object.assign(user, { status: data.status });

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
