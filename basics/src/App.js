import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Steve", age: 27 },
    ],
    showPersons: false,
  };

  otherState = "some other state value";

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: "Manu", age: 29 },
        { name: "Steve", age: 27 },
      ],
    });
  };

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: "Max", age: 23 },
        { name: event.target.value, age: 29 },
        { name: "Steve", age: 27 },
      ],
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
    };

    return (
      <div className="App">
        <h1>Hi, I'm a react app</h1>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {this.state.showPersons ? (
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}
            />
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, "Jim")}
              changed={this.nameChangeHandler}
            >
              My Hobbies: Racing
            </Person>
            <Person
              name={this.state.persons[2].name}
              age={this.state.persons[2].age}
            />
          </div>
        ) : null}
      </div>
    );
  }

  // This is equivalent to above
  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, "Hi, I'm a React App"));
}

export default App;
