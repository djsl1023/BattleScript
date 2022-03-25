import React, { useState, useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/message';

const Chat = (props) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message);

  let message = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    props.room.send('chat', message);

    message = '';
  };
  const handleChange = (e) => {
    message = e.target.value;
  };

  props.room.onMessage('chat', (message) => {
    console.log('frontttttt endddd', message.message);
    messages.push(message);
    console.log(messages, '----- ');
    // props.room.state.messages.set = (message) => {
    //   dispatch(addMessage(message));
    // };
  });
  return (
    <div>
      {console.log(props.room)}
      <h1> Hi From Chat </h1>
      {!messages.length ? (
        <div>no messages </div>
      ) : (
        <div>
          {messages.map((message, index) => {
            return <p key={index}> {message}</p>;
          })}
        </div>
      )}
      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="newMessage"
          type="text"
          onChange={(e) => handleChange(e)}
          // value={message}
        />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};

export default Chat;
