import React from 'react';
import Person from './Person/Person';

const Persons = (props) => {
  console.log('[Persons.js] render');
  return props.persons.map((person, idx) => {
    return (
      <Person
        click={() => props.clicked(idx)}
        name={person.name}
        age={person.age}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}
      />
    );
  });
};

export default Persons;
