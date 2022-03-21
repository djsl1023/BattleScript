import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Welcome from './Welcome';

const Home = () => {
  /* create local state variables
  to keep track of username and roomID
  before submit*/

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
    /* dispatch thunk to update
      db and store
      when this is called?*/
  };

  const handleCreateRoom = async (evt) => {
    /* dispatch thunk to update
      db and store
      when this is called?*/
  };

  return (
    <div>
      <Welcome />

      <form onSubmit={handleJoinRoom}>
        <div className="join-form">
          <label htmlFor="username" className="name-label">
            Name{' '}
          </label>

          <input name="username" onChange={handleUsername} value={username} />

          <label htmlFor="roomID" className="roomID-label">
            Room ID{' '}
          </label>

          <input name="roomID" onChange={handleRoomID} value={roomID} />

          <button type="submit" className="join-room-btn">
            Join Room
          </button>
          <button className="create-room-btn" onClick={handleCreateRoom}>
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
