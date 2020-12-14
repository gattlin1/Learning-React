import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props =>  {
  const [personState, setPersonState] = useState({
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Steve', age: 27 }
      ],
  });
  const [otherState, ] = useState('some other state value');

  console.log(personState, otherState);

  const switchNameHandler = (newName) => {
    setPersonState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Manu', age: 29 },
        { name: 'Steve', age: 27 }
      ],
    })
  }
  return (
    <div className="App">
      <h1>Hi, I'm a react app</h1>
      <button onClick={ () => switchNameHandler('Gattlin') }>Switch Name</button>
      <Person
        name={ personState.persons[0].name }
        age={ personState.persons[0].age }
      />
      <Person
        name={ personState.persons[1].name }
        age={ personState.persons[1].age }
        click={ switchNameHandler.bind(this, 'Jim') } >
        My Hobbies: Racing
      </Person>
      <Person
        name={ personState.persons[2].name }
        age={ personState.persons[2].age }
      />
    </div>
  );

    // This is equivalent to above
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, "Hi, I'm a React App"));
  }

export default App;
