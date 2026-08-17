import { CatalogProto } from 'microservices-proto';
import { isPositiveInt } from '../../common';

export function validateUpdateProductRequest(
  request: CatalogProto.UpdateProductRequest,
): string | void {
  const errors: string[] = [];

  if (!isPositiveInt(request.id)) {
    errors.push('Id must be a positive integer');
  }

  if (request.name !== undefined && !request.name) {
    errors.push('Product name cannot be empty');
  }

  if (
    request.price !== undefined &&
    (typeof request.price !== 'number' || request.price <= 0)
  ) {
    errors.push('Price must be greater than 0');
  }

  if (request.categoryId !== undefined && !isPositiveInt(request.categoryId)) {
    errors.push('Category ID must be a positive integer');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
