import { updateValueDTO } from './../dtos/UpdateValue.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { createOptionDTO } from '../dtos/CreateOption.dto';
import { createValueDTO } from '../dtos/CreateValue.dto';
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

  async createOptionValue(data: createValueDTO) {
    const { name, optionId, meta } = data;
    const queryRunner = getConnection().createQueryRunner();
    const option = await queryRunner.manager.findOne(Option, optionId);
    const value = new OptionValue();
    Object.assign(value, { name, option, type: meta });

    await this.valueRepository.save(value);
    const values = await queryRunner.manager.find(OptionValue, {
      where: { option: { id: optionId } },
    });
    return values;
  }

  async updateOptionValue(optionValueId: number, data: updateValueDTO) {
    const value = await this.valueRepository.findOne(optionValueId);
    const queryRunner = getConnection().createQueryRunner();

    const { name, optionId, meta } = data;
    Object.assign(value, { name, type: meta });

    await this.valueRepository.save(value);
    const values = await queryRunner.manager.find(OptionValue, {
      where: { option: { id: optionId } },
    });
    return values;
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
