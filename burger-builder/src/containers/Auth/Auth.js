import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import * as actions from '../../store/actions';
import './Auth.css';

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const form = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: form });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthenticate(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };
  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let validForm = true;
    for (const element of formElementsArray) {
      validForm = element.config.valid && validForm;
    }

    const form = formElementsArray.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangedHandler(event, element.id)}
      />
    ));

    return (
      <div className='Auth'>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type='Success'>Submit</Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password) =>
      dispatch(actions.auth(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);