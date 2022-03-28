import React, { useState } from 'react';
import Chat from './Chat';

const Footer = (props) => {
  const [isShown, setShown] = useState(false);

  return (
    <div className="footer">
      {isShown ? (
        <div id="chat-comp">
          <Chat room={props.room} />
        </div>
      ) : null}
      <li className="footer-list">
        <button className="chat-btn" onClick={() => setShown(!isShown)}>
          CHAT
        </button>
      </li>
    </div>
  );
};

export default Footer;
