import { CatalogProto } from 'microservices-proto';
import { isPositiveInt } from '../../common';

export function validateListProductsRequest(
  request: CatalogProto.ListProductsRequest,
): string | void {
  const errors: string[] = [];

  if (!isPositiveInt(request.page)) {
    errors.push('Page must be a positive integer');
  }

  if (!isPositiveInt(request.limit) || request.limit > 100) {
    errors.push('Limit must be a positive integer no greater than 100');
  }

  if (request.categoryId !== undefined && !isPositiveInt(request.categoryId)) {
    errors.push('Category ID must be a positive integer');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
