import { CatalogProto } from 'microservices-proto';
import { isPositiveInt } from '../../common';

export function validateUpdateCategoryRequest(
  request: CatalogProto.UpdateCategoryRequest,
): string | void {
  const errors: string[] = [];

  if (!isPositiveInt(request.id)) {
    errors.push('Id must be a positive integer');
  }

  if (request.name !== undefined && !request.name) {
    errors.push('Category name cannot be empty');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
