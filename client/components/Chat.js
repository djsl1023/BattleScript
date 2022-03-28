import React, { useState, useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/message';

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
    console.log(e.target.value);
    setCurrMessage(e.target.value);
  };
  room.state.messages.onAdd = (message, key) => {
    console.log('message', message);
    dispatch(addMessage(message));
  };

  return (
    <div>
      <h1> Hi From Chat </h1>
      {!messages.length ? (
        <div>no messages </div>
      ) : (
        <div className="chat-box">
          {messages.map((message, index) => {
            return (
              <p key={index}>
                {message.username}: {message.message}
              </p>
            );
          })}
        </div>
      )}
      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="newMessage"
          type="text"
          onChange={(e) => handleChange(e)}
          value={currMessage || ''}
        />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};

export default Chat;
