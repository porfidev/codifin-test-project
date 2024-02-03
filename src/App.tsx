import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to={'/products'}>Ir a Productos</Link>
      <Link to={'/cart'}>Ir al Carrito</Link>
    </div>
  )
}

export default App
