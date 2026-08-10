import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

import { GrpcController } from '../common';

import type { EntityIdRequest } from '../common';
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from './interfaces';

import { CategoryService } from './category.service';

@Controller()
@GrpcController('categoryService')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async create(@Payload() request: CreateCategoryRequest) {
    return this.categoryService.create(request);
  }

  async getById(@Payload() request: EntityIdRequest) {
    return this.categoryService.findById(request.id);
  }

  async update(@Payload() request: UpdateCategoryRequest) {
    return this.categoryService.update(request.id, request);
  }

  async delete(@Payload() request: EntityIdRequest): Promise<void> {
    await this.categoryService.delete(request.id);
  }

  async list() {
    const users = await this.categoryService.list();

    return {
      data: users,
    };
  }
}
