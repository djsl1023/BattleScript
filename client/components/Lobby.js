import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/users';

const Lobby = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);

  return (
    <div>
      <h4> Lobby </h4>
      <div className="lobby-container">
        <div className="table">
          <div id="abv-table">
            {Object.keys(users).map((clientId, idx) => {
              if (idx < 3)
                return (
                  <li key={clientId} className="seat">
                    <p>{users[clientId].username}</p>
                    <img
                      src={
                        'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
                      }
                      className="player-avatar"
                    />
                  </li>
                );
            })}
          </div>
          <img
            id="table-img"
            src={
              'https://betandbeat.com/wp-content/uploads/2021/03/oval-poker-table.svg'
            }
          ></img>
          <div id="below-table">
            {Object.keys(users).map((clientId, idx) => {
              if (idx >= 3)
                return (
                  <li key={clientId} className="seat">
                    <p>{users[clientId].username}</p>
                    <img
                      src={
                        'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
                      }
                      className="player-avatar"
                    />
                  </li>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
