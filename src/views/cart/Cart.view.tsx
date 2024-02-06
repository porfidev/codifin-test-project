import { useContext } from 'react';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType, ProductCart } from '../../types/CartType.ts';
import { Product } from '../../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';
import { MainViewContainer } from '../../components/MainViewContainer.tsx';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaRegTrashCan } from 'react-icons/fa6';
import styled from '@emotion/styled';
import { toCurrency } from '../../utils/toCurrency.ts';
import { TitleView } from '../../components/TitleView.ts';

const TotalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
  & span {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 2rem;
  }
`;
function CartView() {
  const products: Product[] | null = useReadLocalStorage('product');
  const { cart, addToCart, removeFromCart } = useContext(CartContext) as CartContextType;

  const onPressDelete = (product: ProductCart) => {
    removeFromCart(product);
  };

  return (
    <MainViewContainer>
      <TitleView>Carrito</TitleView>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart?.products?.map((productCart) => {
            const currentProduct = products?.find((prod) => prod.id === productCart.id);
            return (
              <tr>
                <td>
                  <span>{currentProduct?.name}</span>
                </td>
                <td>
                  <span>${toCurrency(productCart.price)}</span>
                </td>
                <td>
                  <span>
                    {productCart.quantity}
                    {currentProduct && (
                      <button onClick={() => addToCart(currentProduct)}>
                        <FaCirclePlus size={'1.2rem'} />
                      </button>
                    )}
                  </span>
                </td>
                <td>
                  <span>${toCurrency(productCart.price * productCart.quantity)}</span>
                </td>

                <td>
                  <span>
                    <button onClick={() => onPressDelete(productCart)}>
                      <FaRegTrashCan size={'1.2rem'} />
                    </button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TotalWrapper>
        <span>Total: ${toCurrency(cart?.total.toString())}</span>
      </TotalWrapper>
    </MainViewContainer>
  );
}

export default CartView;
