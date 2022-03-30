import React from 'react';

const Rules = () => {
  return (
    <div className="rules">
      <ul>
        <p>TO START A NEW GAME AS HOST:</p>
        <li>Enter name and click the 'Create Room' button </li>
        <p>TO JOIN A GAME:</p>
        <li>
          Enter name, the room ID that was shared with you by the host, and
          click the 'Join Room' button{' '}
        </li>
        <h3>Game Rules</h3>
        <li>
          For each round, players are presented with a prompt to solve before
          the timer expires. If you don't know the answer, try to write
          something funny or creative! You'll have a chance to earn points
          anyway
        </li>
        <li>
          Following this, players vote annoymously on their favorite solutions
          that passed. Following this (if any players failed the tests), players
          vote on their favorite solutions that didn't pass.
        </li>
        <li>
          At the conclusion of the round, players' names and their votes are
          revealed. The host of the current game can now start a new game if
          they desire.
        </li>
      </ul>
    </div>
  );
};

export default Rules;
