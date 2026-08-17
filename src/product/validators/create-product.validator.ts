import { CatalogProto } from 'microservices-proto';
import { isPositiveInt } from '../../common';

export function validateCreateProductRequest(
  request: CatalogProto.CreateProductRequest,
): string | void {
  const errors: string[] = [];

  if (!request.name) {
    errors.push('Product name is required');
  }

  if (typeof request.price !== 'number' || request.price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (!isPositiveInt(request.categoryId)) {
    errors.push('Category ID must be a positive integer');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
