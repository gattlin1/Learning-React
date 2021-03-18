import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/http';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [search, setSearch] = useState('');
  const { isLoading, resError, resData, sendRequest, clear } = useHttp();
  const searchRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === searchRef.current.value) {
        const queryParams =
          search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
        sendRequest(
          'https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients.json' +
            queryParams,
          'GET',
          null,
          null
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, searchRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !resError && resData) {
      const loadedIngredients = [];
      for (const key in resData) {
        loadedIngredients.push({
          id: key,
          title: resData[key].title,
          amount: resData[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [resData, onLoadIngredients, isLoading, resError]);

  return (
    <section className='search'>
      {resError && <ErrorModal onClose={clear}>{resError}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={searchRef}
            type='text'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
