import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CatalogProto } from 'microservices-proto';

import { GrpcController } from '../common';

import { ProductService } from './products.service';

@Controller()
@GrpcController('ProductService')
export class ProductController
  implements CatalogProto.ProductServiceController
{
  constructor(private readonly productsService: ProductService) {}

  async create(@Payload() request: CatalogProto.CreateProductRequest) {
    return this.productsService.createProduct(request);
  }

  async getById(@Payload() request: CatalogProto.EntityIdRequest) {
    return this.productsService.getProductById(request.id);
  }

  async update(@Payload() request: CatalogProto.UpdateProductRequest) {
    return this.productsService.updateProduct(request);
  }

  async delete(@Payload() request: CatalogProto.EntityIdRequest) {
    await this.productsService.delete(request.id);
  }

  async list(@Payload() request: CatalogProto.ListProductsRequest) {
    return this.productsService.listProducts(request);
  }
}
