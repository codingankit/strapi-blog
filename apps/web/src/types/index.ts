export interface StrapiImage {
  id: number;
  documentId: string;
  alternativeText: string | null;
  url: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  thumbnail: StrapiImage;
}

export interface Btn {
  id: number;
  label: string;
  href: string;
  newTab: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination?: Pagination;
  [key: string]: unknown;
}

export interface StrapiResponse<TData, TMeta = object> {
  data: TData;
  meta: Meta & TMeta;
}
