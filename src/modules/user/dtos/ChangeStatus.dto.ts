import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeStatusDTO {
  @ApiProperty({
    required: true,
    default: true,
  })
  @IsNotEmpty()
  status: boolean;
}
