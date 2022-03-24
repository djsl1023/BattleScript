
import React, { useEffect } from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
import { useDispatch } from 'react-redux';
import { setClient } from './store/client';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
