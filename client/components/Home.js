import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './Welcome';
import { setRoom } from '../store/room';
import { Redirect } from 'react-router';
import { useColyseus } from './ColyseusContext';
import Game from './Game';

const Home = () => {
  /* create local state variables
  to keep track of username and roomID
  before submit*/
  const client = useColyseus();
  const [redirectTo, setRedirectTo] = useState(false);
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');

  /* create a reference to the dispatch
   function from redux store*/

  const dispatch = useDispatch();

  /* set username state to value
  from username input*/

  const handleUsername = async (evt) => {
    setUsername(evt.target.value);
  };

  /* set roomID state to value
  from roomID input*/
  const handleRoomID = async (evt) => {
    setRoomID(evt.target.value);
  };

  const handleJoinRoom = async (evt) => {
    evt.preventDefault();
    client
      .joinById(roomID, {
        /* options */
        username: username,
      })
      .then((room) => {
        dispatch(setRoom(room));
        console.log('joined successfully', room);
        setRedirectTo(true);
      })
      .catch((e) => {
        console.error('join error', e);
      });
    /* dispatch thunk to update
      db and store
      when this is called?*/
  };

  const handleCreateRoom = async (evt) => {
    client
      .create('game', {
        /* options */
        username: username,
      })
      .then((room) => {
        dispatch(setRoom(room));
        console.log('joined successfully', room);
        setRedirectTo(true);
      })
      .catch((e) => {
        console.error('join error', e);
      });
    /* dispatch thunk to update
      db and store
      when this is called?*/
  };
  if (redirectTo) {
    return <Redirect to="/game" />;
  }
  return (
    <div>
      <Welcome />

      <form>
        <div className="join-form">
          <label htmlFor="username" className="name-label">
            Name{' '}
          </label>

          <input name="username" onChange={handleUsername} value={username} />

          <label htmlFor="roomID" className="roomID-label">
            Room ID{' '}
          </label>

          <input name="roomID" onChange={handleRoomID} value={roomID} />
        </div>
      </form>
      <button
        type="submit"
        className="create-room-btn"
        onClick={handleJoinRoom}>
        Join Room
      </button>
      <button className="create-room-btn" onClick={handleCreateRoom}>
        Create Room
      </button>
    </div>
  );
};

export default Home;
