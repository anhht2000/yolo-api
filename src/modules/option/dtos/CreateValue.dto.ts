import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createValueDTO {
  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  name: string;
}
