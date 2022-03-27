import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { createOptionDTO } from '../dtos/CreateOption.dto';
import { updateOptionDTO } from '../dtos/UpdateOption.dto';
import { Option } from '../entities/Option.entity';
import { OptionValue } from './../entities/OptionValue.entity';

@Injectable()
export class ValueService {
  constructor(
    @InjectRepository(OptionValue)
    private valueRepository: Repository<OptionValue>,
    private readonly i18n: I18nService,
  ) {}

  createOptionValue(data: createOptionDTO) {
    const { name } = data;
    const value = new OptionValue();
    Object.assign(value, { name });

    return this.valueRepository.save(value);
  }

  async updateOptionValue(optionValueId: number, data: updateOptionDTO) {
    const value = await this.valueRepository.findOne(optionValueId);
    const { name } = data;
    Object.assign(value, { name });

    return this.valueRepository.save(value);
  }

  getOptionValue(optionSearch: FindOneOptions) {
    return this.valueRepository.findOne(optionSearch);
  }

  async deleteOptionValue(optionValueId: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.delete(OptionValue, { id: optionValueId });
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }

    return true;
  }
}
