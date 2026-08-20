import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogProto } from 'microservices-proto';

import {
  BaseService,
  CategoryInUseException,
  CategoryNameExistsException,
} from '../common';
import { Category } from './entities';
import { Product } from '../product/entities';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(repository);
  }

  override async create(
    data: CatalogProto.CreateCategoryRequest,
  ): Promise<Category> {
    const existingCategory = await this.findOne({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new CategoryNameExistsException();
    }

    return super.create(data);
  }

  override async update(
    id: number,
    data: CatalogProto.UpdateCategoryRequest,
  ): Promise<Category> {
    await this.findById(id);

    if (data.name) {
      const existingCategory = await this.findOne({
        where: {
          name: data.name,
        },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new CategoryNameExistsException();
      }
    }

    return super.update(id, data);
  }

  override async delete(id: number): Promise<void> {
    await this.findById(id);

    const productCount = await this.productRepository.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      throw new CategoryInUseException();
    }

    await this.productRepository.delete({ categoryId: id });

    await super.delete(id);
  }
}
