import { css, Global } from '@emotion/react';
import { FC, ReactNode } from 'react';
import ProtestStrike from '../fonts/ProtestStrike-Regular.ttf';

const GlobalStyles: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'Protest Strike';
            src: url(${ProtestStrike}) format('truetype');
          }
          
          body {
            margin: 0;
            background-color: rgb(243, 245, 246);
          }
          
          a {
            text-decoration: none;
          }
          
          h1.logo {
            font-family: 'Protest Strike', sans-serif;
            color: black;
          }
        `}
      />
      {children}
    </>
  );
};

export { GlobalStyles };
