import React from 'react';
import Link from 'next/link';

const page404 = () => {
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

export default page404;
