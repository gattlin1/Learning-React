import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';

class Person extends Component {
  render() {
    return (
      <React.Fragment>
        <p onClick={this.props.click}>
          {this.props.name} is {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type='text'
          onChange={this.props.changed}
          value={this.props.name}
        />
      </React.Fragment>
    );
  }
}

export default Person;
