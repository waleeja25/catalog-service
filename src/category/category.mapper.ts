import { CatalogProto } from 'microservices-proto';

import { Category } from './entities';

export class CategoryMapper {
  static toResponse(category: Category): CatalogProto.Category {
    return {
      id: category.id,
      name: category.name,
      description: category.description ?? '',
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
  }
}
