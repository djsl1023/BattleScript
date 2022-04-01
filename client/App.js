import React, { useEffect } from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
import { useDispatch } from 'react-redux';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <video
        autoPlay
        muted
        loop
        id='bgVideo'
        src="./homebg.mp4"
        type="video/mp4"></video>
    </div>
  );
};

export default App;
