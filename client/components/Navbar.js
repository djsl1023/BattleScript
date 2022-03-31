import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rules from './Rules';
import { userLeaveRoom } from '../store';
import { useDispatch } from 'react-redux';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isShown, setShown] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userLeaveRoom());
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navBlock}>
        <Link to="/" onClick={handleClick}>
          <div className={styles.navList}> Home </div>
        </Link>
        <div className={styles.navList}>
          <button
            className={styles.rulesBtn}
            onMouseEnter={() => setShown(true)}
            onClick={() => setShown(true)}
            onMouseLeave={() => setShown(false)}>
            How To Play
          </button>
          {isShown && (
            <div id={styles.rulesComp}>
              <Rules />
            </div>
          )}
        </div>
      </div>
      <div className={styles.navTitle}>
        <li className={styles.navList} id={styles.centerLogo}>
          BATTLESCRIPT
        </li>
      </div>
      <div className={styles.navLogo}>
        <span className={styles.navList} id={styles.githubLogo}>
          <a href="https://github.com/FSCapstone/Capstone_Team_14_JS">
            <img
              id={styles.githubLogo}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0Uu0auB-_30X62d-vUYM-jhN4TkqPqgv6A&usqp=CAU"
            />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
