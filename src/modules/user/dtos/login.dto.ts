import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginDTO {
  @ApiProperty({ default: 'admin@sims.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  password: string;
}
