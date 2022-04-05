import React, { useState } from 'react';
import styles from '../styles/Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.welcomeMessage}>
      <div className={styles.typewriter}>
        <h1 className={styles.typewriterText}>
          Hello, Welcome To BATTLESCRIPT
        </h1>
      </div>
      <div className={styles.typewriter}>
        <h2 className={styles.typewriterText2}>Select An Option Below</h2>
      </div>
    </div>
  );
};

export default Welcome;
