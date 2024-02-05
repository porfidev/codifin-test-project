import { createBrowserRouter, Link, Navigate, Outlet } from 'react-router-dom';
import App from '../App.tsx';
import AddProductView from '../views/products/AddProduct.view.tsx';
import ListProducts from '../views/products/ListProducts.tsx';
import DetailProductView from '../views/products/DetailProduct.view.tsx';

const router = createBrowserRouter([
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
        <Link to={'/products/add'}>Agregar</Link>
        <Link to={'/products/detail/abcd'}>Detalle</Link>
        <Navigate to={'/products/list'} replace />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: 'list',
        index: true,
        element: <ListProducts />,
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
    element: <h2>Cart View</h2>,
  },
]);

export { router };
