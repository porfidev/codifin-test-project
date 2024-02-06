import { createContext, FC, FormEvent, ReactNode, useEffect, useState } from 'react';
import { OrderingType } from '../types/Ordering.ts';
import { Product } from '../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';
import { clone } from 'lodash-es';

export type SearchSortContextType = {
  toggleOrdering: () => void;
  onPressClear: (event: FormEvent<HTMLButtonElement>) => void;
  onSubmitSearch: (event: FormEvent<HTMLFormElement>) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  ordering: OrderingType;
  orderedProducts: Product[] | null;
};
export const SearchSortContext = createContext<SearchSortContextType | null>(null);

const SearchSortProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const products: Product[] | null = useReadLocalStorage('product');
  const [ordering, setOrdering] = useState<OrderingType>('none');
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  const [orderedProducts, setOrderedProducts] = useState<Product[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
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
      if (isActiveSearch) {
        return;
      }
      return setOrderedProducts(products);
    }

    const toOrder = isActiveSearch ? clone(orderedProducts) : clone(products);

    if (ordering === 'asc') {
      if (toOrder) {
        toOrder.sort(function (a: Product, b: Product) {
          return a.price - b.price;
        });
      }

      return setOrderedProducts(toOrder);
    }

    if (ordering === 'dsc') {
      if (toOrder) {
        toOrder.sort(function (a: Product, b: Product) {
          return b.price - a.price;
        });
      }

      return setOrderedProducts(toOrder);
    }
  }, [ordering]);

  const onPressClear = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSearchTerm('');
    setIsActiveSearch(false);
    setOrderedProducts(products);
  };

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

  return (
    <SearchSortContext.Provider
      value={{
        toggleOrdering,
        onPressClear,
        onSubmitSearch,
        setSearchTerm,
        searchTerm,
        ordering,
        orderedProducts,
      }}
    >
      {children}
    </SearchSortContext.Provider>
  );
};

export { SearchSortProvider };
