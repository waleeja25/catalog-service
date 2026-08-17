import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogProto } from 'microservices-proto';

import { BaseService, EntityNotFoundException } from '../common';

import { CategoryService } from '../category/category.service';

import { Product } from './entities';
import { ProductMapper } from './product.mapper';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
    private readonly categoriesService: CategoryService,
  ) {
    super(repository);
  }

  async createProduct(
    request: CatalogProto.CreateProductRequest,
  ): Promise<CatalogProto.Product> {
    await this.categoriesService.findById(request.categoryId);

    const product = await super.create(request);

    return this.getProductById(product.id);
  }

  async updateProduct(
    request: CatalogProto.UpdateProductRequest,
  ): Promise<CatalogProto.Product> {
    const { id, ...data } = request;

    if (data.categoryId !== undefined) {
      await this.categoriesService.findById(data.categoryId);
    }

    await super.update(id, data);

    return this.getProductById(id);
  }

  override async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete(id);
  }

  async getProductById(id: number): Promise<CatalogProto.Product> {
    const product = await this.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new EntityNotFoundException('Product', id);
    }

    return ProductMapper.toResponse(product);
  }

  async listProducts(
    request: CatalogProto.ListProductsRequest,
  ): Promise<CatalogProto.ProductListResponse> {
    const page = request.page > 0 ? request.page : 1;

    const limit =
      request.limit > 0 && request.limit <= 100 ? request.limit : 10;

    const search = request.search?.trim();

    const query = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      query.where(
        `(
          product.name LIKE :search
          OR product.description LIKE :search
          OR category.name LIKE :search
        )`,
        {
          search: `%${search}%`,
        },
      );
    }

    if (request.categoryId !== undefined) {
      query.andWhere('category.id = :categoryId', {
        categoryId: request.categoryId,
      });
    }

    query
      .orderBy('product.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [products, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data: products.map((product) => ProductMapper.toResponse(product)),

      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}
