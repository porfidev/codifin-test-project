import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter, Link, Navigate, Outlet,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/products',
    element: <div>
      <h1>productos</h1>
      <Link to={'/products/add'}>Agregar</Link>
      <Link to={'/products/detail/abcd'}>Detalle</Link>
      <Navigate to={'/products/list'} replace />
      <Outlet />
    </div>,
    children: [
      {
        path: 'list',
        index: true,
        element: <h2>Lista de Productos</h2>
      },
      {
        path: 'add',
        element: <h2>Agregar Producto</h2>
      },
      {
        path: 'detail/:productId',
        element: <h2>Detalle de Producto</h2>
      }
    ]
  },
  {
    path: '/cart',
    element: <h2>Cart View</h2>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
