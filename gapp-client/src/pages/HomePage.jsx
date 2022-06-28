import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  });

  return (
    <div className="App">
      <input
        placeholder="Message.."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        type="text"
      />
      <button onClick={sendMessage}>Send</button>
      <h1> Message: </h1>
      <p>{messageReceived}</p>
    </div>
  );
};

export default HomePage;
