export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductRequest {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
}

export interface CategorySummary {
  id: number;
  name: string;
  description: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: CategorySummary;
}

export interface ListProductsRequest {
  page: number;
  limit: number;
  search?: string;
  categoryId?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductListResponse {
  data: ProductResponse[];
  meta: PaginationMeta;
}
