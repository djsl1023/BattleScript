import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Final.module.css';

const dummyUser = {
  total: 5000,
  username: 'asdjoaomdo',
};

const Final = () => {
  const users = useSelector((state) => state.users);

  const clientIds = Object.keys(users);

  const findHighestScore = (arr) => {
    let highest = 0;
    let highestClient = '';

    for (let i = 0; i <= arr.length - 1; i++) {
      const client = users[arr[i]];

      const total = client.correctPoints + client.incorrectPoints;

      if (total > highest) {
        highestClient = arr[i];

        highest = total;
      }
    }

    return highestClient;
  };
  const winner = findHighestScore(clientIds);

  return (
    <div className={styles.finalContainer}>
      <div className={styles.header}>
        <h1>The Winner Is....</h1>
      </div>

      <div className={styles.playerContainer}>
        <div className={styles.avatar}>
          <img src="./Images/Avatars/doge.png" />
        </div>
        <p>{dummyUser.username}</p>

        <p>Total Points: {dummyUser.total}</p>
      </div>
    </div>
  );
};

export default Final;

{
  /* <div>Winner: {users[winner].username}</div>
      <div>Total Score: {users[winner].correctPoints + users[winner].incorrectPoints}</div> */
}
