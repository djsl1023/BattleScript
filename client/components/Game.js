import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/users';
import * as Colyseus from 'colyseus.js';

const Game = () => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);
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
