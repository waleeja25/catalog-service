import { DomainException } from './domain.exception';

export class CategoryNameExistsException extends DomainException {
  constructor() {
    super('CATEGORY_NAME_EXISTS', 'Category name already exists');
  }
}
