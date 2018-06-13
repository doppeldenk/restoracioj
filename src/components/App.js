import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Loader from './Loader';
import Routes from './Routes';

const App = () => (
  <BrowserRouter>
    <div>
      <Loader />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">
            <br />
            <Routes />
          </div>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
