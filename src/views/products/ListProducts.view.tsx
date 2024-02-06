import { Product } from '../../types/Product.ts';
import { useContext } from 'react';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType } from '../../types/CartType.ts';
import { AddButton } from '../../components/AddButton.tsx';
import { SearchAndSort } from '../../components/SearchAndSort/SearchAndSort.tsx';
import { SearchSortContext, SearchSortContextType } from '../../context/SearchSort.context.tsx';
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx';

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

      <div className={'grid-flow'} style={{ marginTop: '4rem', marginBottom: '4rem', padding: '0 2rem'}}>
        {orderedProducts &&
          orderedProducts.map((product) => (
            <ProductCard
              product={product}
              onPressAdd={() => addProduct(product)}
              key={product.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ListProductsView;
