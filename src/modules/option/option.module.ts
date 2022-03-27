import { ValueService } from './services/value.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionController } from './controllers/option.controller';
import { Option } from './entities/Option.entity';
import { OptionValue } from './entities/OptionValue.entity';
import { OptionService } from './services/option.service';
import { ValueController } from './controllers/value.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Option, OptionValue])],
  providers: [OptionService, ValueService],
  controllers: [OptionController, ValueController],
  exports: [OptionService, ValueService],
})
export class OptionModule {}
