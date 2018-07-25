import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Map from './Components/Map';

const Router = () => (
  <BrowserRouter>
    <Route 
      path='/'
      component={Map} />
  </BrowserRouter>
);

export default Router;