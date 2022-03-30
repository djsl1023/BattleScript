import React, { useState, useEffect, useRef } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/message';
import styles from '../styles/Chat.module.css';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const Chat = () => {
  const dispatch = useDispatch();
  const [currMessage, setCurrMessage] = useState('');
  const messages = useSelector((state) => state.message);
  const room = useSelector((state) => state.room);

  const handleSubmit = (e) => {
    e.preventDefault();
    room.send('chat', currMessage);

    setCurrMessage('');
  };
  const handleChange = (e) => {
    e.preventDefault();
    setCurrMessage(e.target.value);
  };

  return (
    <div>
      <h1 id={styles.partyChat}> Party Chat </h1>
      {!messages.length ? (
        <div>Trash Talking Encouraged </div>
      ) : (
        <ul id={styles.chatList}>
          {messages.map((message, index) => {
            return (
              <li key={index} className={styles.messages}>
                {message.username}: {message.message}
                <AlwaysScrollToBottom />
              </li>
            );
          })}
        </ul>
      )}
      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="newMessage"
          type="text"
          onChange={(e) => handleChange(e)}
          value={currMessage || ''}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Chat;
