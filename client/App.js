import React from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import * as Colyseus from 'colyseus.js';
const App = () => {
  let client = new Colyseus.Client('ws://localhost:8080');
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
