import { GRPC_PACKAGE, PROTO_PATH } from '../common';

export const grpcConfig = {
  package: GRPC_PACKAGE.CATALOG,
  protoPath: PROTO_PATH.CATALOG,
  url: process.env.GRPC_PRODUCT_URL,
} as const;
