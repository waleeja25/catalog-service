# Catalog Service

gRPC service for managing categories and products. Backed by MySQL via TypeORM, with soft delete.

## Stack

NestJS, `@grpc/grpc-js`, TypeORM, MySQL

## gRPC methods

**`CategoryService`** — `create`, `getById`, `update`, `delete`, `list`. A category can't be deleted while any product still references it (`CategoryInUseException`); category names must be unique.

**`ProductService`** — `create`, `getById`, `update`, `delete`, `list` (supports pagination and free-text search across name/description/category name). Creating or moving a product validates that its `categoryId` actually exists first.

Request payloads are validated with hand-written validator functions (not class-validator DTOs) via a custom `Validate()` pipe, so a bad payload becomes a real `INVALID_ARGUMENT` gRPC status rather than an HTTP-shaped error.

## Error handling

Business rule violations (duplicate name, category in use) and not-found lookups throw a typed `DomainException`, mapped to a gRPC status by `GrpcExceptionFilter`/`DomainExceptionFilter`. MySQL constraint violations are mapped by `DatabaseExceptionFilter`; unrecognized DB errors fall back to a generic `INTERNAL` status with the real error only logged server-side.

## Running locally

```bash
npm install
npm run migration:run
npm run start:dev
```

HTTP health check on `PORT` (default `3002`), gRPC server on `GRPC_URL` (default `0.0.0.0:50052`).

## Required env vars

```
PORT=3002
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=catalog_db
GRPC_URL=0.0.0.0:50052
```

## Depends on

A running MySQL instance with a `catalog_db` database.
