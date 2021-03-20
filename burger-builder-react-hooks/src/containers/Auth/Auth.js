import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import {
  checkValidity,
  updateObject,
  createInputElement,
} from '../../shared/utility';
import * as actions from '../../store/actions';
import './Auth.css';

const initialControlsState = {
  email: createInputElement('input', 'email', null, 'Mail Address', '', {
    required: true,
    isEmail: true,
  }),
  password: createInputElement('input', 'password', null, 'Password', '', {
    required: true,
    minLength: 6,
  }),
};

function Auth(props) {
  const [controls, setControls] = useState(initialControlsState);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!props.isBuildingBurger && props.redirectPath !== '/') {
      props.onChangeRedirectPath('/');
    }
  }, [props.isBuildingBurger, props.redirectPath, props.onChangeRedirectPath]);

  const inputChangedHandler = (event, inputIdentifier) => {
    const form = updateObject(controls, {
      [inputIdentifier]: updateObject(controls[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[inputIdentifier].validation
        ),
        touched: true,
      }),
    });
    setControls(form);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuthenticate(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignUp((prevstate) => !prevstate);
  };

  const formElementsArray = [];
  for (const key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let validForm = true;
  for (const element of formElementsArray) {
    validForm = element.config.valid && validForm;
  }

  let form = props.loading ? (
    <Spinner />
  ) : (
    formElementsArray.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => inputChangedHandler(event, element.id)}
      />
    ))
  );

  let errorMessage = props.error ? <p>{props.error.message}</p> : null;
  let redirect = props.isAuthenticated && <Redirect to={props.redirectPath} />;

  return (
    <div className='Auth'>
      {redirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button type='Success'>Submit</Button>
      </form>
      <Button type='Danger' clicked={switchAuthModeHandler}>
        Switch to Sign {isSignUp ? 'In' : 'Up'}
      </Button>
    </div>
  );
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
