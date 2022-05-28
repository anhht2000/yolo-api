import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductI } from '../types/receipt';

export class createReceiptDTO {
  @ApiProperty({ default: 'Giao giờ hành chính' })
  description: string;

  @ApiProperty({ default: 'Ngoại giao đoàn' })
  address: string;

  @ApiProperty({
    required: true,
    default: [
      { productOptionId: [1, 2], quantity: 3, price: 200000 },
      { productOptionId: [2], quantity: 4, price: 500000 },
    ],
  })
  @IsNotEmpty()
  products: ProductI[];
}
