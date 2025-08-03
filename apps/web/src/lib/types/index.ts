export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export type Optional<T> = T | undefined;

export interface BaseType {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type PaginationData<K extends string, T = any> = {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
} & Record<K, T[]>;
