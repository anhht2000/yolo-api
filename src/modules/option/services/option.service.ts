import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { GetAllOption } from 'src/configs/option';
import {
  FindOneOptions,
  getConnection,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { createOptionDTO } from '../dtos/CreateOption.dto';
import { updateOptionDTO } from '../dtos/UpdateOption.dto';
import { Option } from '../entities/Option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    private readonly i18n: I18nService,
  ) {}

  async getAllOption(searchOptions: GetAllOption) {
    const join = {
      alias: 'option',
      leftJoinAndSelect: {
        value: 'option.values',
      },
    };

    const where = (qb: SelectQueryBuilder<Option>) => {
      if (searchOptions.name) {
        qb.where('option.name LIKE :fullName', {
          fullName: `%${searchOptions.name}%`,
        });
      }
    };

    return this.optionRepository.findAndCount({
      join,
      where,
      order: {
        id: 'DESC',
      },
      skip: (searchOptions.page - 1) * searchOptions.limit,
      take: searchOptions.limit,
    });
  }

  createOption(data: createOptionDTO) {
    const { name } = data;
    const option = new Option();
    Object.assign(option, { name });

    return this.optionRepository.save(option);
  }

  async updateOption(optionId: number, data: updateOptionDTO) {
    const option = await this.optionRepository.findOne(optionId);
    const { name } = data;
    Object.assign(option, { name });

    return this.optionRepository.save(option);
  }

  getOption(optionSearch: FindOneOptions) {
    return this.optionRepository.findOne(optionSearch);
  }

  async deleteOption(optionId: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.delete(Option, { id: optionId });
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

    return true;
  }
}
