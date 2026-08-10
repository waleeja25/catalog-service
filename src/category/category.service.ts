import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService, CategoryNameExistsException } from '../common';
import { Category } from './entities';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,
  ) {
    super(repository);
  }

  override async create(data: Partial<Category>): Promise<Category> {
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
    data: Partial<Category>,
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
}
