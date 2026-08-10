import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
