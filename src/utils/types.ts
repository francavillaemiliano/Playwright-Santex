import { RefObject } from 'react';

export interface ProductVariant {
  id: string;
  price: number;
  currencyCode: string;
  stockLevel: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  currency: string;
  assets?: Asset[];
  variants: ProductVariant[];
  totalQuantity: number;
  total: number;
  subtotal: number;
}

export interface OrderContextType {
  order: Product[];
  setOrder: (value: Product[]) => void;
  addItemToOrder: (product: Product) => void;
  totalPriceOrder: number;
  currency: string;
}

export interface Asset {
  id: string;
  source: string;
}

export interface Page {
  currentPage: number;
  totalPages: number;
  onPageChange?: (newPage: number) => void;
}
export interface ScrollOptions {
  fetchMore: () => void;
  containerRef: RefObject<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  pageSize: number;
  isSmallScreen: boolean;
}
