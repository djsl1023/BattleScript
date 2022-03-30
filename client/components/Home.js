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
          <div>
            <form>
              <div className={styles.joincreateform}>
                <div className={styles.formwtitle}>
                  <label htmlFor="username" className={styles.namelabel}>
                    Name{' '}
                  </label>
                  <input
                    name="username"
                    onChange={handleUsername}
                    value={username}
                  />
                </div>
              </div>
            </form>
            <div className={styles.joincreateform}>
              <div className={styles.formwtitle}>
                <button
                  className={styles.homeButton}
                  type="submit"
                  onClick={handleCreateRoom}>
                  Create Room
                </button>
              </div>
            </div>
          </div>
        );
      }
      case 'join': {
        return (
          <div>
            <form>
              <div className={styles.joincreateform}>
                <div className={styles.formwtitle}>
                  <label htmlFor="username" className={styles.namelabel}>
                    Name{' '}
                  </label>
                  <input
                    name="username"
                    onChange={handleUsername}
                    value={username}
                  />
                </div>
                <div className={styles.formwtitle}>
                  <label htmlFor="roomID" className={styles.roomIDlabel}>
                    Room ID{' '}
                  </label>
                  <input name="roomID" onChange={handleRoomID} value={roomID} />
                </div>
              </div>
            </form>
            <div className={styles.joincreateform}>
              <div className={styles.formwtitle}>
                <button
                  type="submit"
                  className={styles.homeButton}
                  onClick={handleJoinRoom}>
                  Join Room
                </button>
              </div>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className={styles.buttonContainer}>
            <div>
              <button
                className={styles.homeButton}
                onClick={() => setCreateOrJoin('create')}>
                Create Lobby
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.homeButton}
                onClick={() => setCreateOrJoin('join')}>
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
      <div className={styles.input}>{renderSwitch(createOrJoin)}</div>
      <video
        autoPlay
        muted
        loop
        id={styles.bgVideo}
        src="./homebg.mp4"
        type="video/mp4"></video>
      {/* <div>
        <form>
          <div className={styles.joincreateform}>
            <div className={styles.formwtitle}>
              <label htmlFor="username" className={styles.namelabel}>
                Name{' '}
              </label>
              <input
                name="username"
                onChange={handleUsername}
                value={username}
              />
            </div>
            <div className={styles.formwtitle}>
              <label htmlFor="roomID" className={styles.roomIDlabel}>
                Room ID{' '}
              </label>
              <input name="roomID" onChange={handleRoomID} value={roomID} />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.joincreateform}>
        <div className={styles.formwtitle}>
          <button
            type="submit"
            className={styles.createroombtn}
            onClick={handleJoinRoom}>
            Join Room
          </button>
        </div>
        <div className={styles.formwtitle}>
          <button className={styles.createroombtn} onClick={handleCreateRoom}>
            Create Room
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
