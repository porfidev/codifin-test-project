import { ChangeEvent, ComponentPropsWithoutRef, useContext } from 'react';
import { SearchSortContext, SearchSortContextType } from '../../context/SearchSort.context.tsx';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styled from '@emotion/styled';
import { OrderingType } from '../../types/Ordering.ts';
import { FaArrowUpWideShort } from 'react-icons/fa6';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import { FaAlignCenter } from 'react-icons/fa6';
import { FaEraser } from 'react-icons/fa6';

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid gray;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  flex: 3;
`;

const StyledInput = styled.input`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  flex: 1;
  border: none;
  outline-width: 0;
`;

type SearchInputProps = ComponentPropsWithoutRef<'input'>;
const SearchInput = (props: SearchInputProps) => {
  return (
    <SearchInputWrapper>
      <FaMagnifyingGlass />
      <StyledInput {...props} />
    </SearchInputWrapper>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const ActionButton = styled.button`
  flex: 1;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
`;

const getOrderingIcon = (ordering: OrderingType) => {
  switch (ordering) {
    case 'none':
      return <FaAlignCenter size={'1.4rem'} />;
    case 'dsc':
      return <FaArrowUpWideShort size={'1.4rem'} />;
    case 'asc':
      return <FaArrowDownShortWide size={'1.4rem'} />;
    default:
      return <FaAlignCenter size={'1.4rem'} />;
  }
};

const SearchAndSortWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchAndSort = () => {
  const { toggleOrdering, onPressClear, onSubmitSearch, setSearchTerm, searchTerm, ordering } =
    useContext(SearchSortContext) as SearchSortContextType;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchAndSortWrapper>
      <StyledForm onSubmit={onSubmitSearch}>
        <SearchInput name={'search'} value={searchTerm} onChange={handleChange} required />
        <ActionButton>buscar</ActionButton>
        <ActionButton onClick={onPressClear}>
          <FaEraser size={'1.5rem'} />
          limpiar
        </ActionButton>
      </StyledForm>

      <div>
        <ActionButton onClick={toggleOrdering}>{getOrderingIcon(ordering)} Ordenar</ActionButton>
      </div>
    </SearchAndSortWrapper>
  );
};

export { SearchAndSort };
