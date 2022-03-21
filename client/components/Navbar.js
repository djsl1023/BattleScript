import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/login">Rules</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
