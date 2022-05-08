import { ProductLabel } from './../../../configs/product';
import { Product } from 'src/modules/product/entities/Product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Options, ProductStatus } from 'src/configs/product';
import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';

export class createProductDTO {
  @ApiProperty({ required: true, default: 'Aó thun nam' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty({
    required: true,
    default: JSON.stringify([
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300',
    ]),
  })
  @IsNotEmpty()
  images: string;

  @ApiProperty({
    required: true,
    default: JSON.stringify([{ valueId: 1, optionId: 1, price: 200000 }]),
  })
  @IsNotEmpty()
  options: string;

  @ApiProperty({
    required: true,
    default: ProductStatus.PUBLIC,
    enum: ProductStatus,
  })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({
    required: true,
    default: ProductLabel.NEW,
  })
  @IsNotEmpty()
  label: any;
}
