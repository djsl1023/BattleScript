import React from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
import { setClient } from './store/client';

const App = () => {
  const dispatch = useDispatch();
  let client = new Colyseus.Client('ws://localhost:8080');
  dispatch(setClient(client));
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
      <Routes client={client} />
    </div>
  );
};

export default App;
