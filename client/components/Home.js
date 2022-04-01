import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './Welcome';
import { setRoom } from '../store/room';
import { Redirect } from 'react-router';
import { useColyseus } from './ColyseusContext';
import Game from './Game';
import styles from '../styles/Home.module.css';

const Home = () => {
  /* create local state variables
  to keep track of username and roomID
  before submit*/
  const client = useColyseus();
  const [redirectTo, setRedirectTo] = useState(false);
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [createOrJoin, setCreateOrJoin] = useState('');

  /* create a reference to the dispatch
   function from redux store*/

  const dispatch = useDispatch();
  /* set username state to value
  from username input*/

  const handleUsername = async (evt) => {
    evt.preventDefault();
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
  const renderSwitch = (type) => {
    switch (type) {
      case 'create': {
        return (
          <div className={styles.createRoom}>
            <div className={styles.joincreateform}>
              <label htmlFor="username" className={styles.namelabel}>
                Name{' '}
              </label>
              <input
                className={styles.inputStyle}
                type="text"
                name="username"
                onChange={handleUsername}
                value={username}
              />
            </div>
            <button className={styles.submitBtn} type="submit" onClick={handleCreateRoom}>
              Create Room
            </button>
            <button className={styles.submitBtn} onClick={() => setCreateOrJoin('')}>
              Back
            </button>
          </div>
        );
      }
      case 'join': {
        return (
          <div className={styles.createRoom}>
            <div className={styles.joincreateform}>
              <label htmlFor="username" className={styles.namelabel}>
                Name{' '}
              </label>
              <input type="text" name="username" onChange={handleUsername} value={username} />
              <label htmlFor="roomID" className={styles.roomIDlabel}>
                Room ID{' '}
              </label>
              <input name="roomID" type="text" onChange={handleRoomID} value={roomID} />
            </div>
            <button type="submit" className={styles.submitBtn} onClick={handleJoinRoom}>
              Join Room
            </button>
            <button className={styles.submitBtn} onClick={() => setCreateOrJoin('')}>
              Back
            </button>
          </div>
        );
      }
      default: {
        return (
          <div className={styles.buttonContainer}>
            <div>
              <button className={styles.submitBtn} onClick={() => setCreateOrJoin('create')}>
                Create Lobby
              </button>
            </div>
            <div>
              <button className={styles.submitBtn} onClick={() => setCreateOrJoin('join')}>
                Join A Lobby
              </button>
            </div>
          </div>
        );
      }
    }
  };
  if (redirectTo) {
    return <Redirect to="/game" />;
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcome}>
        <Welcome />
      </div>
      <div className={styles.inputSection}>{renderSwitch(createOrJoin)}</div>
    </div>
  );
};

export default Home;
