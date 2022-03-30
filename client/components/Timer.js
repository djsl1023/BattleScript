import React, { useState, useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';

const Timer = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const room = useSelector((state) => state.room);
  const timer = useSelector((state) => state.timer);

  let completed = ((150 - timer) / 150) * 100;
  console.log(timer);
  const containerStyles = {
    display: 'flex',
    height: 20,
    width: '100%',
    paddingLeft: '1em',
    //white
    backgroundColor: '#e0e0de',
    animation: `animate-stripes 0.6s linear infinite`,
    borderRadius: 50,
    // margin: 50,
    marginTop: 50,
    marginBottom: 50,
    marginleft: 20,
    // padding: 10,

    //     margin: '100px auto',
    // marginTop: '220px',
    // width: '400px',
    // textAlign: 'center',
    // position: 'relative',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    //contrast
    backgroundColor: '#D17659',
    borderRadius: 'inherit',
    textAlign: 'right',
    // paddingLeft: 10,
    // animation: `progress ${timer}s`,
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div>
      <div style={containerStyles}>
        <div className="fillerStyles" style={fillerStyles}>
          <span style={labelStyles}>{`${Math.floor(timer / 60)}:${String(
            Math.ceil(timer % 60)
          ).padStart(2, '0')}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
