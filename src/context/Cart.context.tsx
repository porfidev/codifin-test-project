import { createContext, FC, ReactNode, useState } from 'react';
import { CartType, CartContextType, ProductCart } from '../types/CartType.ts';
import { Product } from '../types/Product.ts';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCart, setCurrentCart] = useState<CartType | null>(null);

  const calculateTotal = (products: ProductCart[]): number => {
    const newTotal = products?.reduce((accum, current) => {
      return accum + current.quantity * current.price;
    }, 0);

    return newTotal ?? 0;
  };

  const addToCart = (product: Product) => {
    if (currentCart?.products?.length) {
      const existingProduct = currentCart.products.find(
        (cartProduct) => cartProduct.id === product.id,
      );

      if (existingProduct) {
        const newProducts = currentCart.products.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          }

          return cartProduct;
        });

        return setCurrentCart({
          ...currentCart,
          products: newProducts,
          total: calculateTotal(newProducts),
        });
      }

      const newProduct = {
        id: product.id,
        price: product.price,
        quantity: 1,
      };

      const newProducts = [...currentCart.products, newProduct];

      return setCurrentCart({
        ...currentCart,
        products: newProducts,
        total: calculateTotal(newProducts),
      });
    }

    const newProduct = {
      id: product.id,
      price: product.price,
      quantity: 1,
    };

    const newProducts = [newProduct];

    setCurrentCart({
      id: uuidv4(),
      products: newProducts,
      total: calculateTotal(newProducts),
    });
  };

  const removeFromCart = (product: ProductCart) => {
    if (!currentCart) {
      return setCurrentCart(null);
    }

    const filteredProducts =
      currentCart.products?.filter((cartProduct) => cartProduct.id !== product.id) ?? [];

    const newCart: CartType = {
      id: currentCart.id,
      products: filteredProducts,
      total: calculateTotal(filteredProducts),
    };

    setCurrentCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart: currentCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
