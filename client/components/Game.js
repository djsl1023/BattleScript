import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/users';
import { useColyseus } from './ColyseusContext';
import * as Colyseus from 'colyseus.js';
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
  room.state.users.onAdd = (user, key) => {
    dispatch(addUser(key, user));
    console.log(user, 'has been added at', key);
  };
  return (
    <div>
      <div>Room Code: {room.id}</div>
      {Object.keys(users).map((key) => {
        return <div key={key}>Hello {users[key].username}</div>;
      })}
    </div>
  );
};

export default Game;
