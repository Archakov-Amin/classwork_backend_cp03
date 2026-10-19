import { Module } from '@nestjs/common';
import { SellerService } from './seller.service.js';
import { SellerController } from './seller.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller])
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
