import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/configs/enum';

export class CreateUserDTO {
  @ApiProperty({ default: 'anhht@admin.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'hoang' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ default: 'tuan' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ default: 'Ha Noi' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ default: 'male' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  // @ApiProperty({
  //   type: 'file',
  //   required: false,
  // })
  // avatar?: string;

  @ApiProperty({ default: '0994545878' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ default: '2000879546541' })
  @IsNotEmpty()
  id_card: string;

  @ApiProperty({ default: '2000-12-14' })
  @IsNotEmpty()
  @IsDateString()
  date_of_birth: Date;
}
