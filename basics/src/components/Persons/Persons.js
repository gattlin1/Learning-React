import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }
  render() {
    console.log('[Persons.js] render');
    return this.props.persons.map((person, idx) => {
      return (
        <Person
          click={() => this.props.clicked(idx)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
