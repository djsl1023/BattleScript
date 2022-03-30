import React from 'react';
import { useSelector } from 'react-redux';

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
    <div>
      <div>Winner: {users[winner].username}</div>
      <div>
        Total Score:{' '}
        {users[winner].correctPoints + users[winner].incorrectPoints}
      </div>
    </div>
  );
};

export default Final;
