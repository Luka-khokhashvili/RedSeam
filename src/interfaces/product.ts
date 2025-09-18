export interface Product {
  id: number;
  name: string;
  description: string | null;
  release_year: number;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[] | null;
  available_sizes: string[] | null;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ProductsResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
