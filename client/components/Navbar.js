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
    <div>
      <nav>
        {console.log(styles)}
        {console.log(styles.navbar)}
        <div className={styles.navbar}>
          <Link to="/" onClick={handleClick}>
            <li className={styles.navList}> Home </li>
          </Link>
          <li className={styles.navList}>
            <button
              className={styles.rulesBtn}
              onMouseEnter={() => setShown(true)}
              onMouseLeave={() => setShown(false)}
            >
              Rules
            </button>
            {isShown && (
              <div id={styles.rulesComp}>
                <Rules />
              </div>
            )}
          </li>
          <li className={styles.navList} id={styles.centerLogo}>
            BATTLESCRIPT
          </li>
          <li className={styles.navList} id={styles.githubLogo}>
            <a href="https://github.com/FSCapstone/Capstone_Team_14_JS">
              <img
                id={styles.githubLogo}
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              />
            </a>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
