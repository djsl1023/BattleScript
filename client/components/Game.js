import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/users';
import { useColyseus } from './ColyseusContext';
import * as Colyseus from 'colyseus.js';
import { setGameStatus } from '../store/gameStatus';
import Lobby from './Lobby';
/**
 * MAIN GAME INSTANCE, THIS COMPONENT WILL RENDER OTHER COMPONENTS
 * DEPENDING ON GAME STATE.  ALSO HOLDS COLYSEUS ROOM STATE/SYNC LOGIC
 * SO THAT SCENES/COMPONENTS CAN BE RENDERED AND USED DEPENDING ON STATE
 * OF THE GAME
 */
const Game = () => {
  const dispatch = useDispatch();
  const client = useColyseus();
  // const client = useSelector((state) => state.client);
  const room = useSelector((state) => state.room);
  const users = useSelector((state) => state.users);

  const gameStatus = useSelector((state) => state.gameStatus);

  room.state.users.onAdd = (user, key) => {
    dispatch(addUser(key, user));
    console.log(user, 'has been added at', key);
  };

  room.state.users.onRemove = (user, key) => {
    delete users[key];

    dispatch(removeUser(users));
  };

  room.state.listen('gameStatus', (curr, prev) => {
    dispatch(setGameStatus(curr));
  });

  switch (gameStatus) {
    case 'lobby': {
      return <Lobby />;
    }
    default: {
      return <div>'loading'</div>;
    }
  }
};

export default Game;
