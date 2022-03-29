import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/users';

const Lobby = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);

  return (
    <div>
      <div className="lobby-container">
        <p>Room ID: {room.id}</p>
        <div className="table">
          <div id="abv-table">
            <li className="seat">Seat1</li>
            <li className="seat">Seat2</li>
            <li className="seat">Seat3</li>
          </div>
          <img
            id="table-img"
            src={
              'https://betandbeat.com/wp-content/uploads/2021/03/oval-poker-table.svg'
            }
          ></img>
          <div id="below-table">
            <li className="seat">Seat4</li>
            <li className="seat">Seat5</li>
            <li className="seat">Seat6</li>
          </div>
        </div>
        {Object.keys(users).map((clientId) => {
          return (
            <div key={clientId} className="player">
              <p>{users[clientId].username}</p>
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
    </div>
  );
};

// return (
//   <div>
//     <div>Room Code: {room.id}</div>
//     {Object.keys(users).map((key) => {
//       return <div key={key}>Hello {users[key].username}</div>;
//     })}
//   </div>
// );

export default Lobby;
