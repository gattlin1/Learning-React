import React, { Component } from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';
import withClass from '../../../hoc/withClass';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    this.inputElementRef.current.focus();
  }
  render() {
    console.log('[Person.js] rendering');
    return (
      <React.Fragment>
        {this.props.isAuth ? <p>Authenticated!!</p> : <p>Please Login</p>}
        <p onClick={this.props.click}>
          {this.props.name} is {this.props.age} years old
        </p>
        <input
          type='text'
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </React.Fragment>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  isAuth: PropTypes.bool,
};
export default withClass(Person, classes.Person);
