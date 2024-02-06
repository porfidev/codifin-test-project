import { css, Global } from '@emotion/react';
import { FC, ReactNode } from 'react';
import ProtestStrike from '../fonts/ProtestStrike-Regular.ttf';
import PoppinsRegular from '../fonts/Poppins-Regular.ttf';

const GlobalStyles: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'Protest Strike';
            src: url(${ProtestStrike}) format('truetype');
          }

          @font-face {
            font-family: 'Poppins';
            src: url(${PoppinsRegular}) format('truetype');
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

          .grid-flow {
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(3, 1fr);
            /*grid-template-rows: repeat(2, 1fr); */
            gap: 1rem;
            width: 100%;
          }
        `}
      />
      {children}
    </>
  );
};

export { GlobalStyles };
