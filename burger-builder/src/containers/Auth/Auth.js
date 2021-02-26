import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';
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
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.redirectPath !== '/') {
      this.props.onChangeRedirectPath('/');
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const form = updateObject(this.state.controls, {
      [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true,
      }),
    });
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
    console.log(this.state.isSignUp);
    this.props.onAuthenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevstate) => ({
      isSignUp: !prevstate.isSignUp,
    }));
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

    let form = formElementsArray.map((element) => (
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let redirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.redirectPath} />
    ) : null;

    return (
      <div className='Auth'>
        {redirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type='Success'>Submit</Button>
        </form>
        <Button type='Danger' clicked={this.switchAuthModeHandler}>
          Switch to Sign {this.state.isSignUp ? 'In' : 'Up'}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.building,
    redirectPath: state.auth.redirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onChangeRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
