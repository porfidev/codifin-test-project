import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';

function DetailProductView() {
  const { productId } = useParams();
  const products: Product[] | null = useReadLocalStorage('product');

  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    if(products){
      const currentProduct = products.find((product) => product.id === productId);
      setProduct(currentProduct ?? null);
    }
  }, [productId]);

  return (
    <div>
      <h1>Producto {product?.name}</h1>
      <img src={product?.photo} alt={'producto'} width={200}/>
      <h2>Precio: {product?.price}</h2>
      <button>Agregar a Carrito</button>
    </div>
  );
}

export default DetailProductView;
