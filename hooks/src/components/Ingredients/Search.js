import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
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
  }, [search, onLoadIngredients]);
  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
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
