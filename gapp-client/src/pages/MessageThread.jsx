import React from 'react';

import io from 'socket.io-client';
import { useEffect, useState } from 'react';
// require('dotenv').config();
// import deploymentURL

const hostURL = process.env.REACT_APP_REST_API_URL;

const socket = io(hostURL);

const MessageThread = () => {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit('send_message', { content });
    // setContent('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      console.log(messages);
      setMessages((state) => [...state, data.message]);
    });
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Message.."
        onChange={(event) => setContent(event.target.value)}
        type="text"
        value={content}
      />
      <button onClick={sendMessage}>Send</button>
      <h1> Message: </h1>
      <ul>
        {messages.map((message) => (
          <li>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageThread;
