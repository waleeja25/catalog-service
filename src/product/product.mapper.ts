import { CatalogProto } from 'microservices-proto';

import { Product } from './entities';

export class ProductMapper {
  static toResponse(product: Product): CatalogProto.Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      price: Number(product.price),
      categoryId: product.categoryId,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),

      category: {
        id: product.category.id,
        name: product.category.name,
        description: product.category.description ?? '',
      },
    };
  }
}
