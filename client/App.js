import React, { useEffect } from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
import { useDispatch } from 'react-redux';
import { setClient } from './store/client';
const App = () => {
  /**Initialize a new colyseus client
   * and save client info to redux store
   */
  // let client = new Colyseus.Client('ws://localhost:8080');
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setClient(client));
  // }, []);

  // client
  //   .joinOrCreate('game', {})
  //   .then((room) => {
  //     console.log('joined successfully', room);
  //   })
  //   .catch((e) => {
  //     console.error('join error', e);
  //   });
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
