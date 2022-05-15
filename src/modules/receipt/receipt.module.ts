import { Receipt } from './entities/Receipt.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptController } from './controller/receipt.controller';
import { ReceiptService } from './services/receipt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
