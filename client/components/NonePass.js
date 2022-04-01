import React, { useEffect } from 'react';
import Timer from './Timer';
import { useSelector, useDispatch } from 'react-redux';
import { userNewRound } from '../store';

const NonePass = () => {
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);
  const timer = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    room.send('startTimer', {data: 10000});
  }, []);
  return (
    <div>
      Womp Womp, unfortunately no one passed all of the tests in this round. Your game can continue
      in {`${Math.floor(timer / 60)}:${String(Math.ceil(timer % 60)).padStart(2, '0')}`}. Please use
      this time wisely and review some common docs linked below:
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
        target="_blank">
        {' '}
        Loops and Iteration
      </a>
    </div>
  );
};

export default NonePass;
