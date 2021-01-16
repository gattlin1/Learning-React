import React from 'react';

const WithClass = (WrappedComponent, className) => {
  return (props) => {
    return (
      <div className={className}>
        <WrappedComponent />
      </div>
    );
  };
};

export default WithClass;
