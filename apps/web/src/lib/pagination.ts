/**
 * Pagination Utilities
 * Provides reusable pagination functionality for API endpoints
 */

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  skip?: number;
  take?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Calculate pagination parameters
 */
export function calculatePagination(
  page: number = 1,
  pageSize: number = 10
): { skip: number; take: number } {
  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, Math.min(pageSize, 100));
  const skip = (validPage - 1) * validPageSize;
  return { skip, take: validPageSize };
}

/**
 * Create a paginated response with metadata
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number = 1,
  pageSize: number = 10
): PaginatedResponse<T> {
  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, Math.min(pageSize, 100));
  const totalPages = Math.ceil(total / validPageSize);
  return {
    data,
    meta: {
      page: validPage,
      pageSize: validPageSize,
      total,
      totalPages,
      hasNextPage: validPage < totalPages,
      hasPreviousPage: validPage > 1,
    },
  };
}

/**
 * Parse pagination query parameters
 */
export function parsePaginationQuery(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.max(1, Math.min(parseInt(searchParams.get("pageSize") || "10", 10), 100));
  return { page, pageSize };
}

/**
 * Helper to create skip and take from search params
 */
export function getPaginationFromQuery(searchParams: URLSearchParams) {
  const { page, pageSize } = parsePaginationQuery(searchParams);
  return calculatePagination(page, pageSize);
}
