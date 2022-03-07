import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OptionModule } from './modules/option/option.module';
import { ReceiptModule } from './modules/receipt/receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    ProductModule,
    OptionModule,
    ReceiptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
