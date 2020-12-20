import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Steve', age: 27 },
    ],
    showPersons: false,
  };

  otherState = 'some other state value';

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Manu', age: 29 },
        { name: 'Steve', age: 27 },
      ],
    });
  };

  nameChangeHandler = (event, id) => {
    const newPersonIdx = this.state.persons.findIndex(
      (person) => person.id === id
    );
    let newPerson = {
      ...this.state.persons[newPersonIdx],
    };
    newPerson.name = event.target.value;
    const persons = [...this.state.persons];
    persons[newPersonIdx] = newPerson;

    this.setState({
      persons: persons,
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  deletePersonHandler = (index) => {
    const newPersons = [...this.state.persons];
    newPersons.splice(index, 1);
    this.setState({
      persons: newPersons,
    });
  };

  render() {
    let persons = null;
    const btnClass = [classes.button];
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, idx) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.deletePersonHandler(idx)}
                  name={person.name}
                  age={person.age}
                  changed={(event) => this.nameChangeHandler(event, person.id)}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      );
      btnClass.push(classes.red);
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push('red');
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push('bold');
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a react app</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonsHandler}
        >
          Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
