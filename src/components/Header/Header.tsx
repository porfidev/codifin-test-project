import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CartHeaderButton } from '../CartHeaderButton/CartHeaderButton.tsx';

const HeaderWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
`;

const InnerHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  min-width: 800px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <InnerHeaderWrapper>
        <Link to={'/products/list'}>
          <h1 className={'logo'}>Codifin Mart</h1>
        </Link>
        <CartHeaderButton />
      </InnerHeaderWrapper>
    </HeaderWrapper>
  );
};

export { Header };
