import { useReadLocalStorage } from 'usehooks-ts';
import { Product } from '../../types/Product.ts';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { OrderingType } from '../../types/Ordering.ts';

function ListProducts() {
  const products: Product[] | null = useReadLocalStorage('product');

  const [ordering, setOrdering] = useState<OrderingType>('none');
  const [orderedProducts, setOrderedProducts] = useState<Product[] | null>(null);
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const addToCart = (id: string) => {
    console.log('agregar al carrito' + id);
  };

  const toggleOrdering = () => {
    if (ordering === 'none') {
      return setOrdering('asc');
    }

    if (ordering === 'asc') {
      return setOrdering('dsc');
    }

    return setOrdering('none');
  };

  useEffect(() => {
    if (ordering === 'none') {
      if(isActiveSearch) {
        return;
      }
      return setOrderedProducts(products);
    }

    const toOrder = isActiveSearch
      ? JSON.parse(JSON.stringify(orderedProducts))
      : JSON.parse(JSON.stringify(products));

    // TODO: FIX 5 > 20
    if (ordering === 'asc') {
      if (toOrder) {
        toOrder.sort(function (a: Product, b: Product) {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      return setOrderedProducts(toOrder);
    }

    if (ordering === 'dsc') {
      if (toOrder) {
        toOrder.sort(function (a: Product, b: Product) {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      return setOrderedProducts(toOrder);
    }
  }, [ordering]);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsActiveSearch(true);
    setOrdering('none');

    if (searchTerm && products) {
      const searchResult = products.filter((product) => {
        return product.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      });

      setOrderedProducts(searchResult);
    }
  };

  const onPressClear = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSearchTerm('');
    setIsActiveSearch(false);
    setOrderedProducts(products);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>

      <form onSubmit={onSubmitSearch}>
        <input name={'search'} value={searchTerm} onChange={handleChange} required />
        <button>buscar</button>
        <button onClick={onPressClear}>limpiar</button>
      </form>

      <button onClick={toggleOrdering}>Ordenar {ordering}</button>

      {orderedProducts &&
        orderedProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/detail/${product.id}`}>
              {product.name}
              {product.price}
              <img width={180} src={product.photo} alt={'foto'} />
            </Link>
            <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
          </div>
        ))}
    </div>
  );
}

export default ListProducts;
