# Catalog Service

gRPC service for managing categories and products. Backed by MySQL via TypeORM, with soft delete.

## Stack

NestJS, `@grpc/grpc-js`, TypeORM, MySQL

## gRPC methods

**`CategoryService`** — `create`, `getById`, `update`, `delete`, `list`. A category can't be deleted while any product still references it; category names must be unique.

**`ProductService`** — `create`, `getById`, `update`, `delete`, `list` (pagination + free-text search across name/description/category name). Creating or moving a product validates the referenced `categoryId` exists.

Request payloads are validated with hand-written validator functions via a custom `Validate()` pipe, not class-validator DTOs.

## Error handling

Business rule violations and not-found lookups throw a typed `DomainException`, mapped to a gRPC status by `GrpcExceptionFilter`/`DomainExceptionFilter`. MySQL constraint violations are mapped by `DatabaseExceptionFilter`.

## Folder structure

```
src/
├── category/             # controller, service, mapper, entity, validators
├── product/              # controller, service, mapper, entity, validators
├── common/                # BaseEntity/BaseService, exceptions, filters, gRPC constants
├── config/
├── database/              # data source + migrations
└── health/
```

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
