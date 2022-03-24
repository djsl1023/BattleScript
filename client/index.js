import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import ColyseusProvider from './components/ColyseusContext';

ReactDOM.render(
  <ColyseusProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ColyseusProvider>,
  document.getElementById('app')
);
