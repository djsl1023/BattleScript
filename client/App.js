import React, { useEffect } from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        progressStyle={{ backgroundColor: '#92b6c7' }}
      />
      <Navbar />
      <Routes />
      <video
        autoPlay
        muted
        loop
        id="bgVideo"
        src="./homebg.mp4"
        type="video/mp4"></video>
    </div>
  );
};

export default App;
