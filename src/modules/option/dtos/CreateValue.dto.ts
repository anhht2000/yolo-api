import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OptionType } from 'src/configs/enum';

export class createValueDTO {
  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: OptionType.TEXT })
  meta: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  optionId: number;
}
