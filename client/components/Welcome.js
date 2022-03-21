import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const dispatch = useDispatch();

  const handleUsername = async (evt) => {
    setUsername(evt.target.value);
  };
  const handleRoomID = async (evt) => {
    setRoomID(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
  };

  return (
    <div>
      <div className="welcome-message"></div>
      <form id="join-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Name </label>
        <input name="username" onChange={handleUsername} value={username} />
        <label htmlFor="roomID">Room ID </label>
        <input name="roomID" onChange={handleRoomID} value={roomID} />
        <button type="submit" className="join-btn">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Welcome;
