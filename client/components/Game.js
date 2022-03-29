import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, updateUser } from '../store/users';
import { addMessage } from '../store/message';
import { useColyseus } from './ColyseusContext';
import * as Colyseus from 'colyseus.js';
import { setGameStatus } from '../store/gameStatus';
import { setPrompt } from '../store/prompt';
import { setFailedVotes } from '../store/failVoting';
import { setPassedVotes } from '../store/passVoting';
import Lobby from './Lobby';
import Prompt from './Prompt';
import Chat from './Chat';
import Tally from './Tally';
import Vote from './Vote';
import Footer from './Footer';
import Timer from './Timer';
import { setTimer } from '../store/timer';
import HostBar from './HostBar';
import { setHostKey } from '../store/hostKey';
import NoneFail from './NoneFail';
import NonePass from './NonePass';

/**
 * MAIN GAME INSTANCE, THIS COMPONENT WILL RENDER OTHER COMPONENTS
 * DEPENDING ON GAME STATE.  ALSO HOLDS COLYSEUS ROOM STATE/SYNC LOGIC
 * SO THAT SCENES/COMPONENTS CAN BE RENDERED AND USED DEPENDING ON STATE
 * OF THE GAME
 */
const Game = () => {
  console.log('Rendering game');
  const dispatch = useDispatch();
  const client = useColyseus();
  // const client = useSelector((state) => state.client);
  const room = useSelector((state) => state.room);
  const users = useSelector((state) => state.users);

  const gameStatus = useSelector((state) => state.gameStatus);
  useEffect(() => {
    room.state.users.onAdd = (user, key) => {
      dispatch(addUser(key, user));
      user.onChange = (changes) => {
        changes.forEach((change) => {
          dispatch(
            updateUser({ key: key, field: change.field, value: change.value })
          );
        });
      };
      console.log(user, 'has been added at', key);
    };

    room.state.users.onRemove = (user, key) => {
      delete users[key];

      dispatch(removeUser(users));
    };
    room.state.listen('gameStatus', (curr, prev) => {
      dispatch(setGameStatus(curr));
    });

    room.state.listen('timer', (curr, prev) => {
      // console.log(curr);
      dispatch(setTimer(curr));
    });
    room.state.listen('hostKey', (curr, prev) => {
      // console.log(curr);
      dispatch(setHostKey(curr));
    });
    //AFTER SENDING GETQUESTION(lobby.js) TO SERVER, LISTENS FOR BROADCAST,
    //SET QUESTION TO CLIENT STATE
    room.onMessage('getPrompt', (prompt) => {
      dispatch(setPrompt(prompt));
    });
  }, [room]);
  const renderSwitch = (gameStatus) => {
    switch (gameStatus) {
      case 'lobby': {
        return (
          <div>
            <Lobby />
          </div>
        );
      }
      case 'prompt': {
        return (
          <div>
            <Prompt />
          </div>
        );
      }
      case 'nonefail': {
        return (
          <div>
            <NoneFail />
          </div>
        );
      }
      case 'failvote': {
        return (
          <div>
            <Vote key="1" />;
          </div>
        );
      }
      case 'nonepass': {
        return (
          <div>
            <NonePass />
          </div>
        );
      }
      case 'passvote': {
        return (
          <div>
            <Vote key="2" />;
          </div>
        );
      }
      case 'tally': {
        return (
          <div>
            <Tally />
          </div>
        );
      }

      default: {
        return <div>'loading'</div>;
      }
    }
  };

  return (
    <div>
      <HostBar />
      <div>{renderSwitch(gameStatus)}</div>

      <Footer room={room} />
    </div>
  );
};

export default Game;
