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

      <form onSubmit={handleSubmit}>
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
          <button type="button" className="create-room-btn">
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default Welcome;
