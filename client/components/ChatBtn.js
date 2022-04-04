import React, { useState } from 'react';
import Chat from './Chat';
import styles from '../styles/Button.module.css';
// import Icon from '../Images/chaticon2.png';

const ChatBtn = () => {
  const [isShown, setShown] = useState(false);

  return (
    <div>
      {isShown ? (
        <div id={styles.chatComp}>
          <Chat />
        </div>
      ) : null}
      <button id={styles.chatButton} onClick={() => setShown(!isShown)}>
        <img id={styles.icon} src="./Images/BlueChatIcon.png" />
      </button>
    </div>
  );
};

export default ChatBtn;
