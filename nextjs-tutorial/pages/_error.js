import React from 'react';

const _error = () => {
  return (
    <div>
      <h1>Oops, something went wrong</h1>
      <p>
        Try{' '}
        <Link href='/'>
          <a>Going Back</a>
        </Link>
      </p>
    </div>
  );
};

export default _error;
