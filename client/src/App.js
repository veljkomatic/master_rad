import React from 'react';
import { Provider } from 'react-redux';
import Router from 'Router';
import store from './Redux/store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;