import { join } from 'path';

export const GRPC_PACKAGE = {
  CATALOG: 'catalog',
} as const;

export const PROTO_PATH = {
  CATALOG: join(process.cwd(), '../microservices-proto/proto/catalog.proto'),
} as const;
