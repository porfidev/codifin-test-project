import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product.ts';
import { useReadLocalStorage } from 'usehooks-ts';
import { CartContext } from '../../context/Cart.context.tsx';
import { CartContextType } from '../../types/CartType.ts';

function DetailProductView() {
  const { productId } = useParams();
  const products: Product[] | null = useReadLocalStorage('product');
  const [product, setProduct] = useState<Product | null>(null);
  const { cart, addToCart } = useContext(CartContext) as CartContextType;


  const addProduct = (product?: Product | null) => {
    console.log('agregar al carrito' + product);
    if(product){
      addToCart(product);
    }
  };

  useEffect(() => {
    if(products){
      const currentProduct = products.find((product) => product.id === productId);
      setProduct(currentProduct ?? null);
    }
  }, [productId]);

  return (
    <div>
      <h3>Productos en Carrito: {cart?.products?.reduce((accum, current) => {
        return accum + current.quantity;
      }, 0) ?? 0}</h3>

      <h1>Producto {product?.name}</h1>
      <img src={product?.photo} alt={'producto'} width={200} />
      <h2>Precio: {product?.price}</h2>
      <button onClick={() => addProduct(product)}>Agregar al carrito</button>
    </div>
  );
}

export default DetailProductView;
