import { CatalogProto } from 'microservices-proto';

export function validateCreateCategoryRequest(
  request: CatalogProto.CreateCategoryRequest,
): string | void {
  if (!request.name) {
    return 'Category name is required';
  }
}
