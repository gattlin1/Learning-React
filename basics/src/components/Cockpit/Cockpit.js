import React from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
  const assignedClasses = [];
  let btnClass = '';

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }
  if (props.showPersons) {
    btnClass = classes.red;
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Person
      </button>
    </div>
  );
};

export default Cockpit;