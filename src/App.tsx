import { Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to={'/products'}>Ir a Productos</Link>
      <Link to={'/cart'}>Ir al Carrito</Link>
      <Navigate to={'/products'} replace />
    </div>
  )
}

export default App
