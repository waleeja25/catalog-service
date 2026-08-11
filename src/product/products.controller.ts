import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

import { GrpcController } from '../common';
import type { EntityIdRequest } from '../common';

import type {
  CreateProductRequest,
  UpdateProductRequest,
  ListProductsRequest,
} from './interfaces';

import { ProductService } from './products.service';

@Controller()
@GrpcController('ProductService')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  async create(@Payload() request: CreateProductRequest) {
    return this.productsService.createProduct(request);
  }

  async getById(@Payload() request: EntityIdRequest) {
    return this.productsService.getProductById(request.id);
  }

  async update(@Payload() request: UpdateProductRequest) {
    return this.productsService.updateProduct(request);
  }

  async delete(@Payload() request: EntityIdRequest) {
    await this.productsService.delete(request.id);

    return {};
  }

  async list(@Payload() request: ListProductsRequest) {
    return this.productsService.listProducts(request);
  }
}
