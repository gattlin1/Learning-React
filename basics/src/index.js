import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App appTitle={'An app title'} />,
  document.getElementById('root')
);
registerServiceWorker();
