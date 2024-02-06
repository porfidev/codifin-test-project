import { Product } from '../../types/Product.ts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType } from '../../types/CartType.ts';
import { AddButton } from '../../components/AddButton.tsx';
import { SearchAndSort } from '../../components/SearchAndSort/SearchAndSort.tsx';
import { SearchSortContext, SearchSortContextType } from '../../context/SearchSort.context.tsx';

function ListProductsView() {
  const { orderedProducts } = useContext(SearchSortContext) as SearchSortContextType;
  const { addToCart } = useContext(CartContext) as CartContextType;

  const addProduct = (product: Product) => {
    console.log('agregar al carrito' + product);
    addToCart(product);
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div
        style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          padding: '0 1rem',
        }}
      >
        <div style={{ flex: 2 }}>
          <SearchAndSort />
        </div>
        <AddButton />
      </div>

      {orderedProducts &&
        orderedProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/detail/${product.id}`}>
              {product.name}
              {product.price}
              <img width={180} src={product.photo} alt={'foto'} />
            </Link>
            <button onClick={() => addProduct(product)}>Agregar al carrito</button>
          </div>
        ))}
    </div>
  );
}

export default ListProductsView;
