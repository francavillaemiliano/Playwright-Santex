import { ButtonProps } from '@mui/material';

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

export interface CustomDrawerProps {
  itemsTotal: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface IncrementButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export interface PrimaryButtonProps extends ButtonProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  text: string;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  onCartEmpty: () => void;
}
