import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as screens from './Components/screens';

const Router = () => (
  <BrowserRouter>
    <Switch>
        <Route
        exact
        path='/'
        component={screens.Login} />
      <Route
        path='/register'
        component={screens.Register} />
      <Route 
        path='/forgot'
        component={screens.ForgotPassword} />
    </Switch>

  </BrowserRouter>
);

export default Router;