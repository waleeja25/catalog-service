import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CatalogProto } from 'microservices-proto';

import { GrpcController, Validate, validateEntityIdRequest } from '../common';

import { ProductService } from './products.service';
import {
  validateCreateProductRequest,
  validateListProductsRequest,
  validateUpdateProductRequest,
} from './validators';

@Controller()
@GrpcController('ProductService')
export class ProductController
  implements CatalogProto.ProductServiceController
{
  constructor(private readonly productsService: ProductService) {}

  async create(
    @Payload(Validate(validateCreateProductRequest))
    request: CatalogProto.CreateProductRequest,
  ) {
    return this.productsService.createProduct(request);
  }

  async getById(
    @Payload(Validate(validateEntityIdRequest))
    request: CatalogProto.EntityIdRequest,
  ) {
    return this.productsService.getProductById(request.id);
  }

  async update(
    @Payload(Validate(validateUpdateProductRequest))
    request: CatalogProto.UpdateProductRequest,
  ) {
    return this.productsService.updateProduct(request);
  }

  async delete(
    @Payload(Validate(validateEntityIdRequest))
    request: CatalogProto.EntityIdRequest,
  ) {
    await this.productsService.delete(request.id);
  }

  async list(
    @Payload(Validate(validateListProductsRequest))
    request: CatalogProto.ListProductsRequest,
  ) {
    return this.productsService.listProducts(request);
  }
}
