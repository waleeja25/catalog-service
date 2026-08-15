import { DomainException } from './domain.exception';
import { status as GrpcStatus } from '@grpc/grpc-js';

export class CategoryInUseException extends DomainException {
  constructor() {
    super(
      'CATEGORY_IN_USE',
      'Category cannot be deleted because it has products',
      GrpcStatus.FAILED_PRECONDITION,
    );
  }
}
