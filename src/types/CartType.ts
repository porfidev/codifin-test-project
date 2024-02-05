import { Product } from './Product.ts';

export type ProductCart = {
  id: string;
  price: number;
  quantity: number;
}

export type CartType = {
  id: string;
  products?: ProductCart[];
  total: number;
}

export type CartContextType = {
  cart: CartType | null;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}
