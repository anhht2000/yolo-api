import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createProductDTO } from './CreateProduct.dto';
import { OptionsUpdate } from 'src/configs/product';

export class updateProductDTO extends createProductDTO {
  @ApiProperty({
    required: true,
    default: JSON.stringify([]),
  })
  @IsNotEmpty()
  options: string;

  @ApiProperty({
    required: true,
    default: JSON.stringify([
      { id: 2, path: 'https://picsum.photos/200/300' },
      { id: 3, path: 'https://picsum.photos/200/300' },
    ]),
  })
  @IsNotEmpty()
  images: string;
}
