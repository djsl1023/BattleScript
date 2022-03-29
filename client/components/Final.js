import React from 'react';
import { useSelector } from 'react-redux';

const Final = () => {
  const users = useSelector((state) => state.users);
  console.log(users);

  const clientIds = Object.keys(users);
  console.log(clientIds);

  const findHighestScore = (arr) => {
    console.log('function');
    let highest = 0;
    let highestClient = '';

    for (let i = 0; i <= arr.length - 1; i++) {
      console.log('test');
      const client = users[arr[i]];

      const total = client.correctPoints + client.incorrectPoints;

      if (total > highest) {
        highestClient = arr[i];

        highest = total;
      }
    }
    console.log(highestClient);

    return highestClient;
  };
  const winner = findHighestScore(clientIds);
  console.log(winner);
  console.log(users[winner]);

  return (
    <div>
      <div>Winner: {users[winner].username}</div>
      <div>Total Score: {users[winner].correctPoints + users[winner].incorrectPoints}</div>
    </div>
  );
};

export default Final;
