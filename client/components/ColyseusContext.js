import React, { useContext, createContext } from 'react';
import * as Colyseus from 'colyseus.js';

// for testing on local host
let client = new Colyseus.Client('ws://localhost:8080');

// for deployment to heroku
// let client = new Colyseus.Client('ws://fsa-battlescript.herokuapp.com/');

export const ColyseusContext = createContext(client);

export function useColyseus() {
  return useContext(ColyseusContext);
}

export default function ColyseusProvider(props) {
  return (
    <ColyseusContext.Provider value={client}>
      {props.children}
    </ColyseusContext.Provider>
  );
}
