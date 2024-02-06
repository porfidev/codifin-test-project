import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

const MainViewWrapper = styled.div`
  min-width: 800px;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const InnerMainViewWrapper = styled.div`
  flex: 1;
`;

const MainViewContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MainViewWrapper>
      <InnerMainViewWrapper>{children}</InnerMainViewWrapper>
    </MainViewWrapper>
  );
};
export { MainViewContainer };
