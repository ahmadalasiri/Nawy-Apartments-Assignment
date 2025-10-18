export interface Apartment {
  id: string;
  unitNumber: string;
  name: string;
  project: string;
  description: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SearchFilters {
  search?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
  limit?: number;
}
