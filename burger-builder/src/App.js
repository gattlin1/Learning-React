import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Layout>
            <Switch>
              <Route path='/auth' component={Auth} />
              <Route path='/logout' component={Logout} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route path='/' component={BurgerBuilder} exact />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
