import { createHashRouter, Link, Navigate, Outlet } from 'react-router-dom';
import App from '../App.tsx';
import AddProductView from '../views/products/AddProduct.view.tsx';
import ListProductsView from '../views/products/ListProducts.view.tsx';
import DetailProductView from '../views/products/DetailProduct.view.tsx';
import CartView from '../views/cart/Cart.view.tsx';
import { Header } from '../components/Header/Header.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: (
      <>
        <Navigate to={'/products/list'} replace />
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'list',
        index: true,
        element: (
          <>
            <Header />
            <ListProductsView />
          </>
        ),
      },
      {
        path: 'add',
        element: (
          <>
            <Header />
            <AddProductView />
          </>
        ),
      },
      {
        path: 'detail/:productId',
        element: (
          <>
            <Header />
            <DetailProductView />
          </>
        ),
      },
    ],
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <CartView />
      </>
    ),
  },
]);

export { router };
