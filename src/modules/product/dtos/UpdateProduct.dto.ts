import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createProductDTO } from './CreateProduct.dto';
import { OptionsUpdate } from 'src/configs/product';

export class updateProductDTO extends createProductDTO {
  @ApiProperty({
    required: true,
    default: [],
  })
  @IsNotEmpty()
  options: OptionsUpdate[];

  @ApiProperty({
    required: true,
    default: [
      { id: 2, path: 'https://picsum.photos/200/300' },
      { id: 3, path: 'https://picsum.photos/200/300' },
    ],
  })
  @IsNotEmpty()
  images: any[];
}
