import React from 'react';

const players = [
  { id: 1, username: 'cody' },
  { id: 2, username: 'murphy' },
  { id: 3, username: 'cody' },
  { id: 4, username: 'ben' },
  { id: 5, username: 'star' },
  { id: 6, username: 'elliot' },
  { id: 7, username: 'henry' },
  { id: 8, username: 'fira' },
];

const Lobby = () => {
  const handleStartGame = () => {
    console.log('start game button clicked');
  };

  return (
    <div>
      <div className="lobby-container">
        {players.map((player) => {
          return (
            <div key={player.id} className="player">
              <p>{player.username}</p>
              <img
                src={
                  'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
                }
                className="player-avatar"
              />
            </div>
          );
        })}
      </div>
      <div className="start-game-btn ">
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Lobby;
