import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule, getTypeOrmConfig } from './config';

import { APP_FILTER } from '@nestjs/core';
import {
  DatabaseExceptionFilter,
  DomainExceptionFilter,
  GrpcExceptionFilter,
} from './common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/products.module';

import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    CategoryModule,
    ProductModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
