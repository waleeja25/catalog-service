import { DomainException } from './domain.exception';

export class CategoryInUseException extends DomainException {
  constructor() {
    super(
      'CATEGORY_IN_USE',
      'Category cannot be deleted because it has products',
    );
  }
}
