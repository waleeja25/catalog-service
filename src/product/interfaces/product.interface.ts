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

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category?: CategorySummary;
}

export interface ProductListResponse {
  data: Product[];
}
