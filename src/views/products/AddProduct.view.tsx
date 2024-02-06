import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { TitleView } from '../../components/TitleView.ts';
import { MainViewContainer } from '../../components/MainViewContainer.tsx';
import { ProductForm } from '../../types/ProductForm.ts';

function AddProductView() {
  const [productStorage, setProductStorage] = useLocalStorage<ProductForm[]>('product', []);
  const validateProduct: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    console.log(productStorage);

    // TODO: Add Extra Validations
    setProductStorage([...productStorage, { id: uuidv4(), ...product }]);
  };

  const [product, setProductForm] = useState<ProductForm>({
    name: '',
    price: 0,
  });

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const reader = new FileReader();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileImage(event.target.files[0]);
      return console.log('una imagen', event.target.files);
    }
    setProductForm({ ...product, [event.target.name]: event.target.value });
  };

  const loadImage = (event: ProgressEvent<FileReader>) => {
    if (event) {
      const { result } = event.target as FileReader;
      if (result) {
        setFileData(result.toString());
        setProductForm({ ...product, photo: result.toString() });
      }
    }
  };

  useEffect(() => {
    if (fileImage) {
      reader.readAsDataURL(fileImage);
      reader.addEventListener('load', loadImage);
    }

    return () => {
      if (reader && reader.readyState === 1) {
        reader.abort();
        reader.removeEventListener('load', loadImage);
      }
    };
  }, [fileImage]);

  return (
    <MainViewContainer>
      <TitleView>Agregar Producto</TitleView>
      <form onSubmit={validateProduct}>
        <div>
          <label htmlFor={'name'}>Producto</label>
          <input name={'name'} value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor={'price'}>Precio</label>
          <input name={'price'} value={product.price} onChange={handleChange} />
        </div>
        <div>{fileData && <img src={fileData} alt={'preview'} />}</div>
        <div>
          <label htmlFor={'photo'}>Producto</label>
          <input type={'file'} name={'photo'} accept={'image/*'} onChange={handleChange} />
        </div>
        <button>Agregar</button>
      </form>
    </MainViewContainer>
  );
}

export default AddProductView;
