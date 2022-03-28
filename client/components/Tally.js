import React from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Points',
    },
  },
};

export default function Tally() {
  const users = useSelector((state) => state.users);

  const clientIds = Object.keys(users);

  /*
  create array of client usernames
   to be used as labels for chart
  */
  const labels = clientIds.map((client) => {
    return users[client].username;
  });

  /*
  below to be used after voting increments
  correctPoints and incorrectPoints
  */

  // const correctPoints = clients.map((client) => {
  //   return users[client].correctPoints;
  // });
  // const incorrectPoints = clients.map((client) => {
  //   return users[client].username;
  // });

  /*
  using dummy data for correctPoints
  and incorrectPoints for now, works for up to 5 users
  */

  const correctPoints = ['2', '5', '1', '0', '3'];
  const incorrectPoints = ['3', '0', '4', '5', '2'];

  const dummyData = {
    labels,
    datasets: [
      {
        label: 'Fail score',
        data: incorrectPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Pass score',
        data: correctPoints,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={dummyData} />;
}
