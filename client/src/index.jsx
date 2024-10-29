import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

import store from './redux/store';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom'; 

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Router>
    <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
