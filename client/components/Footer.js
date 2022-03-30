import React, { useState } from 'react';
import Chat from './Chat';

const Footer = (props) => {
  const [isShown, setShown] = useState(false);

  return (
    <div className="footer">
      {isShown ? (
        <div id="chat-comp">
          <Chat />
        </div>
      ) : null}
      <ul className="footer-list">
        <li>ROOM ID: {props.room.id}</li>
        <button className="chat-btn" onClick={() => setShown(!isShown)}>
          CHAT
        </button>
      </ul>
    </div>
  );
};

export default Footer;
