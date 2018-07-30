import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as screens from './Components/screens';

const Router = () => (
  <BrowserRouter>
    <Route 
      path='/'
      component={screens.Login} />
  </BrowserRouter>
);

export default Router;