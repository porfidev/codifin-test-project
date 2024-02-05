import React, { useContext } from 'react';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType, ProductCart } from '../../types/CartType.ts';
import { Product } from '../../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';

function CartView(props) {
  const products: Product[] | null = useReadLocalStorage('product');
  const { cart, addToCart, removeFromCart } = useContext(CartContext) as CartContextType;

  const onPressDelete = (product: ProductCart) => {
    removeFromCart(product)
  };

  return (
    <div>
      <h1>Carrito</h1>
      {
        cart?.products?.map(productCart => {
          const currentProduct = products?.find(prod => prod.id === productCart.id);
          return <div style={{ display: 'flex', gap: 10}}>
            <div>{currentProduct?.name}</div>
            <div>Precio Unitario: ${productCart.price}</div>
            <div>Cantidad: {productCart.quantity}</div>
            <div>Subtotal: ${productCart.price * productCart.quantity}</div>

            <div>
              { currentProduct && <button onClick={() => addToCart(currentProduct)}>Agregar</button> }
              <button onClick={() => onPressDelete(productCart)}>Eliminar</button>
            </div>
          </div>
        })
      }
      <div>Total: ${cart?.total}</div>
    </div>
  );
}

export default CartView;
