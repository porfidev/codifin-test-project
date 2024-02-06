import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType } from '../../types/CartType.ts';
import styled from '@emotion/styled';

const ActionButton = styled.button`
  flex: 1;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  border: 0;
  background-color: rgb(255, 106, 0);
  color: white;
  &:hover {
    background-color: rgba(255, 106, 0, 0.5);
  }
  border-radius: 2rem;
`;

const ProductNameText = styled.h1`
  font-size: 2.2rem;
  font-family: 'Poppins', sans-serif;
  flex: 1;
  margin: 0;
`;

const ProductPriceText = styled(ProductNameText)`
  font-size: 2.5rem;
`;

const DetailProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  padding: 4rem;
  gap: 4rem;
`;

const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DetailProductView() {
  const { productId } = useParams();
  const products: Product[] | null = useReadLocalStorage('product');
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext) as CartContextType;

  const addProduct = (product?: Product | null) => {
    if (product) {
      addToCart(product);
    }
  };

  useEffect(() => {
    if (products) {
      const currentProduct = products.find((product) => product.id === productId);
      setProduct(currentProduct ?? null);
    }
  }, [productId]);

  return (
    <DetailProductWrapper>
      <PhotoWrapper>
        <img src={product?.photo} alt={'producto'} width={200} />
      </PhotoWrapper>
      <div>
        <ProductNameText>{product?.name}</ProductNameText>
        <ProductPriceText>Precio: {product?.price}</ProductPriceText>
        <p>
          Nullam eget felis eget nunc lobortis mattis aliquam. Sollicitudin aliquam ultrices
          sagittis orci a. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Massa
          sapien faucibus et molestie ac. Vitae purus faucibus ornare suspendisse sed nisi lacus
          sed. Cras ornare arcu dui vivamus arcu felis bibendum. Eget dolor morbi non arcu risus
          quis. Habitant morbi tristique senectus et netus. Netus et malesuada fames ac turpis
          egestas maecenas pharetra. Purus gravida quis blandit turpis cursus in hac habitasse.
        </p>
        <ActionButton onClick={() => addProduct(product)}>Agregar al carrito</ActionButton>
      </div>
    </DetailProductWrapper>
  );
}

export default DetailProductView;
