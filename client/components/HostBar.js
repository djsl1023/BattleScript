import React, { useState, useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';

const HostBar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);
  const timer = useSelector((state) => state.timer);
  const hostKey = useSelector((state) => state.hostKey);

  const handleStartGame = () => {
    // ON START, SEND MESSAGE TO SERVER TO GET THE QUESTION
    room.send('getPrompt');
    room.send('start', {
      gameStatus: 'prompt',
    });
    room.send('startTimer');
  };

  return hostKey === room.sessionId ? (
    <div className="hostbar">
      <div className="start-game-btn ">
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  ) : (
    ''
  );
};

export default HostBar;
