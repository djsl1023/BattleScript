import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/users';
import styles from '../styles/Lobby.module.css';

const Lobby = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);

  return (
    <div>
      <h4 className={styles.roomId}> Lobby: room Id : {room.id} </h4>
      <div className={styles.lobbyWrapper}>
        {Object.keys(users).map((clientId) => {
          return (
            <div className={styles.element} key={clientId}>
              <img src={users[clientId].avatarURL} className={styles.avatar} />
              <div className={styles.name}>{users[clientId].username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lobby;
