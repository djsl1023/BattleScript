import React, { useState } from 'react';
import Chat from './Chat';
// import Icon from '../Images/chaticon2.png';

const ChatBtn = () => {
  const [isShown, setShown] = useState(false);

  return (
    <div>
      {isShown ? (
        <div id="chat-comp">
          <Chat />
        </div>
      ) : null}
      <button className="chat-btn" onClick={() => setShown(!isShown)}>
        Chat
      </button>
    </div>
  );
};

export default ChatBtn;
