import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OptionsUpdate } from 'src/configs/product';
import { ProductI } from '../types/receipt';
import { createReceiptDTO } from './CreateReceipt.dto';

export class updateReceiptDTO extends createReceiptDTO {
  @ApiProperty({
    required: true,
    default: [
      { productOptionId: 1, quantity: 3 },
      { productOptionId: 2, quantity: 4 },
    ],
  })
  @IsNotEmpty()
  products: Array<ProductI & { receiptProductId: number }>;
}
