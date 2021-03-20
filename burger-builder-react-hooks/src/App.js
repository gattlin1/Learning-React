import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

function App({ onTryAutoSignup, isAuthenticated }) {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/' component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div className='App'>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.token !== null };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
