import React from 'react';
import { Provider } from 'react-redux';

import Navbar from './Navbar/Navbar';
import Table from './Table/Table';

import store from '../redux/store';

const App = () => (
  <Provider store={store}>
    <React.Fragment>
      <Navbar />
      <Table />
    </React.Fragment>
  </Provider>
);

export default App;