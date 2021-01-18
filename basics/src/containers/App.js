import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor', props);

    this.state = {
      persons: [
        { id: 1, name: 'Max', age: 28 },
        { id: 2, name: 'Manu', age: 29 },
        { id: 3, name: 'Steve', age: 27 },
      ],
      showPersons: false,
      showCockpit: true,
      otherState: 'some other state value',
      changedCounter: 0,
      authenticated: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

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

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changedCounter: prevState.changedCounter + 1,
      };
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  toggleCockpitHandler = () => {
    this.setState({
      showCockpit: !this.state.showCockpit,
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  deletePersonHandler = (index) => {
    const newPersons = [...this.state.persons];
    newPersons.splice(index, 1);
    this.setState({
      persons: newPersons,
    });
  };

  render() {
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux classes={classes.App}>
        <button onClick={this.toggleCockpitHandler}>Remove Cockpit</button>
        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          />
        ) : null}
        {persons}
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
