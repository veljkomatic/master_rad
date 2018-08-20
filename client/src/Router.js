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
        exact
        path='/register'
        component={screens.Register} />
      <Route
        exact
        path='/map'
        component={screens.Map} />
    </Switch>

  </BrowserRouter>
);

export default Router;