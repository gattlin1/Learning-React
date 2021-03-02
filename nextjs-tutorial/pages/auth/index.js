import React from 'react';
import User from '../../components/User';

const indexAuthPage = (props) => {
  return (
    <div>
      <h1>The auth index page {props.appName}</h1>
      <User name='Gattlin' age={23} />
      <User name='Jim' age={53} />
    </div>
  );
};

indexAuthPage.getInitialProps = (context) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'app-name (auth)' });
    }, 1000);
  });
  return promise;
};

export default indexAuthPage;
