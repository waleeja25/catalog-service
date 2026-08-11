export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  id: number;
  name?: string;
  description?: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListResponse {
  data: CategoryResponse[];
}
