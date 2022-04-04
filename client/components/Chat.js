import React, { useState, useEffect, useRef } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/message';
import styles from '../styles/Chat.module.css';
import { useColyseus } from './ColyseusContext';

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
  const users = useSelector((state) => state.users);

  const client = useColyseus();

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
    <div id={styles.chatComp}>
      <h1 id={styles.partyChat}> Chatroom </h1>
      <div id={styles.listDiv}>
        <ul id={styles.chatList}>
          {!messages.length ? (
            <li className={styles.messages}>Trash Talking Encouraged </li>
          ) : (
            messages.map((message, index) => {
              return (
                <li
                  key={index}
                  className={
                    message.username === users[room.sessionId].username
                      ? styles.myMessage
                      : styles.messages
                  }>
                  {message.username === users[room.sessionId].username ? (
                    <p className={styles.messageDiv}>
                      {message.message}
                      <br />
                    </p>
                  ) : (
                    <p className={styles.messageDiv}>
                      {message.username}: {message.message}
                      <br />
                    </p>
                  )}
                  <AlwaysScrollToBottom />
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div id={styles.formDiv}>
        <form id={styles.messageForm} onSubmit={(e) => handleSubmit(e)}>
          <input
            name="newMessage"
            type="text"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            value={currMessage || ''}
          />
          <input className={styles.submit} type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
