import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType } from '../../types/CartType.ts';
import { FaCartShopping } from 'react-icons/fa6';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const CartLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ProductCountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: red;
  color: white;
  font-size: 0.8rem;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  z-index: 1;
  top: -0.5rem;
  right: -0.2rem;
`;

const CartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: rgb(255, 106, 0);
  border-radius: 3rem;
  position: relative;
`;

const CartHeaderButton = () => {
  const { cart } = useContext(CartContext) as CartContextType;
  const [cartCounter, setCartCounter] = useState<number>(0);

  useEffect(() => {
    if (!cart) {
      return;
    }
    const productCount =
      cart?.products?.reduce((accum, current) => {
        return accum + current.quantity;
      }, 0) ?? 0;

    setCartCounter(productCount);
  }, [cart]);

  return (
    <CartLink to={'/cart'}>
      <CartButtonWrapper>
        {cart && <ProductCountWrapper>{cartCounter}</ProductCountWrapper>}
        <FaCartShopping size={'1.5rem'} />
      </CartButtonWrapper>
    </CartLink>
  );
};

export { CartHeaderButton };
