import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CatalogProto } from 'microservices-proto';

import { GrpcController, Validate, validateEntityIdRequest } from '../common';

import { CategoryMapper } from './category.mapper';
import { CategoryService } from './category.service';
import {
  validateCreateCategoryRequest,
  validateUpdateCategoryRequest,
} from './validators';

@Controller()
@GrpcController('CategoryService')
export class CategoryController
  implements CatalogProto.CategoryServiceController
{
  constructor(private readonly categoryService: CategoryService) {}

  async create(
    @Payload(Validate(validateCreateCategoryRequest))
    request: CatalogProto.CreateCategoryRequest,
  ) {
    return CategoryMapper.toResponse(
      await this.categoryService.create(request),
    );
  }

  async getById(
    @Payload(Validate(validateEntityIdRequest))
    request: CatalogProto.EntityIdRequest,
  ) {
    return CategoryMapper.toResponse(
      await this.categoryService.findById(request.id),
    );
  }

  async update(
    @Payload(Validate(validateUpdateCategoryRequest))
    request: CatalogProto.UpdateCategoryRequest,
  ) {
    return CategoryMapper.toResponse(
      await this.categoryService.update(request.id, request),
    );
  }

  async delete(
    @Payload(Validate(validateEntityIdRequest))
    request: CatalogProto.EntityIdRequest,
  ): Promise<void> {
    await this.categoryService.delete(request.id);
  }

  async list(): Promise<CatalogProto.CategoryListResponse> {
    const categories = await this.categoryService.list();

    return {
      data: categories.map((category) => CategoryMapper.toResponse(category)),
    };
  }
}
