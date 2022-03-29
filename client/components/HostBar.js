import React, { useState, useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';

const HostBar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);
  const timer = useSelector((state) => state.timer);
  const hostKey = useSelector((state) => state.hostKey);
  const gameStatus = useSelector((state) => state.gameStatus);
  const handleStartGame = () => {
    // ON START, SEND MESSAGE TO SERVER TO GET THE QUESTION
    room.send('getPrompt');
    room.send('start', {
      gameStatus: 'prompt',
    });
    room.send('startTimer');
  };
  const handleContinueGame = () => {
    room.send('continue');
  };
  const renderSwitch = (gameStatus) => {
    switch (gameStatus) {
      case 'tally':
      case 'nonepass':
      case 'nonefail': {
        return (
          <div className="continue-btn">
            <button onClick={handleContinueGame}>Continue</button>
          </div>
        );
      }
      case 'lobby': {
        return (
          <div className="start-game-btn ">
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        );
      }
      default: {
        return '';
      }
    }
  };
  return hostKey === room.sessionId ? (
    <div className="hostbar">{renderSwitch(gameStatus)}</div>
  ) : (
    ''
  );
};

export default HostBar;
