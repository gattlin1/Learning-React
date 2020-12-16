import React from 'react';

function Validation(props) {
  let validationText = '';
  if (props.length >= 5) {
    validationText = 'Text long enough';
  } else {
    validationText = 'Text too short';
  }

  return <div>{validationText}</div>;
}

export default Validation;
