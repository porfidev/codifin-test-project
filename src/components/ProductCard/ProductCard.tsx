import { Link } from 'react-router-dom';
import { Product } from '../../types/Product.ts';
import styled from '@emotion/styled';

type ProductDisplayProps = {
  product: Product;
  onPressAdd: (product: Product) => void;
};

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px dashed #CCC;
  &:hover {
    border: 2px solid rgb(255, 106, 0);
  }
`;

const ProductNameText = styled.span`
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProductPriceText = styled(ProductNameText)`
  font-size: 2.5rem;
`;

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

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
`;

const ProductCard = ({ product, onPressAdd }: ProductDisplayProps) => {
  return (
    <ProductCardWrapper key={product.id}>
      <LinkWrapper to={`/products/detail/${product.id}`}>
        <ProductNameText>{product.name}</ProductNameText>
        <ProductPriceText>${product.price}</ProductPriceText>
        <img width={180} src={product.photo} alt={'foto'} />
      </LinkWrapper>
      <ActionButton
        onClick={() => onPressAdd(product)}
      >
        Agregar al carrito
      </ActionButton>
    </ProductCardWrapper>
  );
};

export { ProductCard };
