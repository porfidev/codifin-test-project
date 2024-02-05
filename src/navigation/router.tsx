import { createHashRouter, Link, Navigate, Outlet } from 'react-router-dom';
import App from '../App.tsx';
import AddProductView from '../views/products/AddProduct.view.tsx';
import ListProductsView from '../views/products/ListProducts.view.tsx';
import DetailProductView from '../views/products/DetailProduct.view.tsx';
import CartView from '../views/cart/Cart.view.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: (
      <div>
        <Link to={'/products/list'}>
          <h1>productos</h1>
        </Link>
        <Link to={'/products/add'}>Nuevo Producto</Link>
        <Link to={'/cart'}>Carrito</Link>
        <Navigate to={'/products/list'} replace />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: 'list',
        index: true,
        element: <ListProductsView />,
      },
      {
        path: 'add',
        element: <AddProductView />,
      },
      {
        path: 'detail/:productId',
        element: <DetailProductView />,
      },
    ],
  },
  {
    path: '/cart',
    element: <CartView />,
  },
]);

export { router };
