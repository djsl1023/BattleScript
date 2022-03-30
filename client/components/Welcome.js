import React, { useState } from 'react';
import styles from '../styles/Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.welcomeMessage}>
      {/* <div className={styles.typewriter}>
        <div className={styles.typewriterText}> */}
      Hello, Welcome to BATTLESCRIPT
      {/* </div>
      </div> */}
    </div>
  );
};

export default Welcome;
