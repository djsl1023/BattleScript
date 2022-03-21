import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/rules">Rules</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
