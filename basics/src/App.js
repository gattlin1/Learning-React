import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Steve', age: 27 }
    ]
  }

  switchNameHandler = () => {
    this.setState({
      persons: [
      { name: 'Gattlin', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Steve', age: 32 }
      ]
    })
  }

  render () {
    return (
      <div className="App">
        <h1>Hi, I'm a react app</h1>
        <button onClick={ this.switchNameHandler }>Switch Name</button>
        <Person
          name={ this.state.persons[0].name }
          age={ this.state.persons[0].age }
        />
        <Person
          name={ this.state.persons[1].name }
          age={ this.state.persons[1].age }
        />
        <Person
          name={ this.state.persons[2].name }
          age={ this.state.persons[2].age }
        />
      </div>
    );

    // This is equivalent to above
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, "Hi, I'm a React App"));
  }
}

export default App;
