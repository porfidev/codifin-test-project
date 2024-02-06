import { css, Global } from '@emotion/react';
import { FC, ReactNode } from 'react';
import ProtestStrike from '../fonts/ProtestStrike-Regular.ttf';
import PoppinsRegular from '../fonts/Poppins-Regular.ttf';
import PoppinsBold from '../fonts/Poppins-Bold.ttf';

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

          @font-face {
            font-family: 'Poppins';
            src: url(${PoppinsBold}) format('truetype');
            font-weight: bold;
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
          
          p {
            font-family: 'Poppins', sans-serif;
          }

          .grid-flow {
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(3, 1fr);
            /*grid-template-rows: repeat(2, 1fr); */
            gap: 1rem;
            width: 100%;
          }
          
          table {
            width: 100%;
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            border-spacing: 0;

            tr:nth-child(2n) {
              background-color: #CCC;
            }
            
            & th {
              font-weight: bold;
            }
            
            & td {
              span {
                display: flex;
                justify-content: center;
                padding: 0.3rem 0.6rem;
                gap: 1rem;
              }
              
              button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                padding: 0.2rem 0.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                
                &:hover {
                  background-color: lightsalmon;
                }
              }
            }
            
            & td:not(:last-child) {
              border-right: 4px solid gray;
            }
          }
        `}
      />
      {children}
    </>
  );
};

export { GlobalStyles };
