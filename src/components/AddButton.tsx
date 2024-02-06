import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaCirclePlus } from 'react-icons/fa6';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  background-color: rgb(255, 106, 0);
  max-width: 12rem;
  padding: 0.8rem 2rem;
`;

const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const AddButton = () => {
  return (
    <ButtonLink to={'/products/add'}>
      <ButtonWrapper>
        <FaCirclePlus size={'1.5rem'} />
        Agregar Producto
      </ButtonWrapper>
    </ButtonLink>
  );
};

export { AddButton };
