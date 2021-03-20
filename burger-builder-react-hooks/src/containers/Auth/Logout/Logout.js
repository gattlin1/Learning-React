import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/actions';

function Logout({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to='/' />;
}

const mapDispatchToProps = (dispatch) => {
  return { onLogout: () => dispatch(actions.logout()) };
};
export default connect(null, mapDispatchToProps)(Logout);
