import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class createOptionDTO {
  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  name: string;
}
