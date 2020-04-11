import React from 'react';
import InputWithLabel from '../InputWithLabel/index';
import {ReactComponent as Check} from '../check.svg';

const SearchForm = ({searchTerm, onSearchInput, OnSearchSubmit }) => (
    <form onSubmit={OnSearchSubmit}>
      <InputWithLabel id='search' value={searchTerm} isFocused onInputChange={onSearchInput}>
        <strong>Search:</strong>
      </InputWithLabel>
  
      <button type='submit' disabled={!searchTerm}>
        <Check height='18px' width='18px' />
      </button>
    </form>
  );

  export default SearchForm;