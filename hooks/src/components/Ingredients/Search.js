import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === searchRef.current.value) {
        const queryParams =
          search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
        fetch(
          'https://react-hooks-cd957-default-rtdb.firebaseio.com/ingredients.json' +
            queryParams
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, onLoadIngredients, searchRef]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
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
