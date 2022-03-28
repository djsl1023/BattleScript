import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rules from './Rules';

const Navbar = () => {
  const [isShown, setShown] = useState(false);
  return (
    <div>
      <nav>
        <div className="navbar">
          <Link to="/">
            <li className="nav-list">Home </li>
          </Link>
          <li className="nav-list">
            <button
              className="rules-btn"
              onMouseEnter={() => setShown(true)}
              onMouseLeave={() => setShown(false)}
            >
              Rules
            </button>
            {isShown && (
              <div id="rules-comp">
                <Rules />
              </div>
            )}
          </li>
          <li className="nav-list" id="center-logo">
            BATTLESCRIPT
          </li>
          <li className="nav-list" id="github-logo">
            <a href="https://github.com/FSCapstone/Capstone_Team_14_JS">
              <img
                id="github-logo"
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
