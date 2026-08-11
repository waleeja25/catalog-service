import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { ProductService } from './products.service';

import { CategoryModule } from '../category/category.module';
import { ProductController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
