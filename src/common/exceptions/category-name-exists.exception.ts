import { DomainException } from '@microservices/microservice-common';
import { status as GrpcStatus } from '@grpc/grpc-js';

export class CategoryNameExistsException extends DomainException {
  constructor() {
    super(
      'CATEGORY_NAME_EXISTS',
      'Category name already exists',
      GrpcStatus.ALREADY_EXISTS,
    );
  }
}
