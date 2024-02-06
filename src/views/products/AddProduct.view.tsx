import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { TitleView } from '../../components/TitleView.ts';
import { MainViewContainer } from '../../components/MainViewContainer.tsx';
import { ProductForm } from '../../types/ProductForm.ts';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  display: flex;

  gap: 2rem;
  margin-bottom: 1.2rem;
  & label {
    flex: 1;
    display: flex;
    font-family: 'Poppins', sans-serif;
    justify-content: flex-end;
    align-items: center;
  }
  & input {
    flex: 3;
  }
`;
const StyledInput = styled.input`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  flex: 1;
  outline-width: 0;
  border: none;
  border-bottom: 4px solid #ccc;
  padding: 0.6rem 1rem;
  &:focus {
    border-bottom: 4px solid gray;
  }
`;

const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px;
  overflow: hidden;
  border-radius: 2rem;
  margin-bottom: 2rem;

  & img {
    width: 300px;
  }
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 2rem;
  background-color: rgb(255, 106, 0);
  padding: 0.8rem 2rem;
  cursor: pointer;
  border: none;
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 1.2rem;
  &:hover {
    background-color: rgba(255, 106, 0, 0.5);
  }
`;

function AddProductView() {
  const [productStorage, setProductStorage] = useLocalStorage<ProductForm[]>('product', []);
  const validateProduct: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    console.log(productForm);
    const form = event.target as HTMLFormElement;
    if (!productForm.name) {
      return alert('Debe ingresar un nombre válido');
    }

    if (!Number(productForm.price) || Number(productForm.price) <= 0) {
      return alert('Debe ingresar un precio válido, mayor a 0');
    }

    if (String(productForm.price).length > 6) {
      return alert('El precio no debe superar los 6 digitos');
    }

    if (String(productForm.name).length > 20) {
      return alert('El nombre no debe superar los 20 carácteres');
    }

    if (fileImage && fileImage?.size > 1024 * 1024) {
      return alert('La imagen debe ser menor a 1Mb');
    }
    // TODO: Add Extra Validations
    setProductStorage([...productStorage, { id: uuidv4(), ...productForm }]);
    resetForm();
    alert('Producto agregado');
    form.reset();
  };

  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    price: 0,
  });

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const reader = new FileReader();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files[0].size > 1024 * 1024) {
        alert('La imagen debe ser menor a 1Mb');
      }
      return setFileImage(event.target.files[0]);
    }

    setProductForm({ ...productForm, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    // TODO: Set File
    setProductForm({
      name: '',
      price: 0,
      photo: undefined,
    });
    setFileImage(null);
    setFileData(null);
  };

  const loadImage = (event: ProgressEvent<FileReader>) => {
    if (event) {
      const { result } = event.target as FileReader;
      if (result) {
        setFileData(result.toString());
        setProductForm({ ...productForm, photo: result.toString() });
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
  }, [fileImage, reader]);

  return (
    <MainViewContainer>
      <TitleView>Agregar Producto</TitleView>
      <form onSubmit={validateProduct}>
        <FormGroup>
          <label htmlFor={'name'}>Producto</label>
          <StyledInput
            name={'name'}
            value={productForm.name}
            maxLength={20}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor={'price'}>Precio</label>
          <StyledInput
            name={'price'}
            type={'number'}
            min={1}
            max={99999}
            value={productForm.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <PhotoWrapper>{fileData && <img src={fileData} alt={'preview'} />}</PhotoWrapper>
        <FormGroup>
          <label htmlFor={'photo'}>Producto</label>
          <StyledInput
            type={'file'}
            name={'photo'}
            accept={'image/*'}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButtonWrapper>
          <SubmitButton>Crear Producto</SubmitButton>
        </SubmitButtonWrapper>
      </form>
    </MainViewContainer>
  );
}

export default AddProductView;
