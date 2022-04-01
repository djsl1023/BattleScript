import React from 'react';
import styles from '../styles/Rules.module.css';
const Rules = () => {
  return (
    <div className="rules">
      <ul>
        <p>TO START, CREATE OR JOIN A GAME</p>
        <h3>Overview</h3>
        <p>
          Welcome to BattleScript! In this game, you will be given timed
          algorithm prompts to solve, which can be viewed and voted on by
          others. The more votes you get for your answer, the more points you
          gain!{' '}
        </p>
        <h3>Objectives:</h3>
        <li>Obtain the most points by the end of the game</li>
        <li>
          Learn to solve algorithms, and the different ways they can be solved
        </li>
        <li>Most of all, have fun!</li>
        <h3>Prompt Round:</h3>
        <li>
          <p>{`Read the prompt, and see if you can
          figure out a solution.  If you can't try to think of
          something clever, funny, or try your best to get close!
          You can still earn some points if your tests dont pass.`}</p>
        </li>
        <h3>Voting Rounds:</h3>
        <div className={styles.voteRules}>
          <div>
            <p className={styles.voteTitle}>Fail Voting Round</p>
            <li>Code that did not pass are viewed in this round</li>
            <li>Vote on clever, funny, or close answers, your choice!</li>
            <li>75 Pts per vote</li>
          </div>
          <div>
            <p className={styles.voteTitle}>Pass Voting Round</p>
            <li>Code that pass are viewed in this round</li>
            <li>Vote on efficiency, cleverness, cleanliness, your choice!</li>
            <li>250 Pts per vote</li>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Rules;
