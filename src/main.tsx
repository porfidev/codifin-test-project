import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './navigation/router.tsx';
import { CartProvider } from './context/Cart.context.tsx';
import { GlobalStyles } from './components/GlobalStyles.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <GlobalStyles>
        <RouterProvider router={router} />
      </GlobalStyles>
    </CartProvider>
  </React.StrictMode>,
);
