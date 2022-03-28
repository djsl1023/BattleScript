import React, { useState, useEffect, useRef } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/message';

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
  room.state.messages.onAdd = (message, key) => {
    dispatch(addMessage(message));
  };

  return (
    <div>
      <h1> Hi From Chat </h1>
      {!messages.length ? (
        <div>no messages </div>
      ) : (
        <ul className="chat-box">
          {messages.map((message, index) => {
            return (
              <li key={index} className="messages">
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
