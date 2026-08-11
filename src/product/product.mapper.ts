import { Product } from './entities';
import { ProductResponse } from './interfaces';

export class ProductMapper {
  static toResponse(product: Product): ProductResponse {
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
