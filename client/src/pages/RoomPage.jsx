import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';
import { loadRoom } from '../services/room';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthenticationContext from '../context/authentication';

const RoomPage = () => {
  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState(null);
  const { id } = useParams();

  const handleReceivedMessage = (data) => {
    setMessages((currentState) => [...currentState, data]);
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    if (socket && content.length > 0) {
      setContent('');
      socket.emit('send_message', { content });
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    // Load current room information
    loadRoom(id).then((data) => {
      // console.log(data.user.name);
      console.log(data.messages);
      setMessages(data.messages);
      setGroup(data.group);
    });

    // Listen for new messages
    const createdSocket = io(process.env.REACT_APP_REST_API_URL, {
      withCredentials: true,
      query: { room: id }
    });
    setSocket(createdSocket);
    createdSocket.on('received_message', handleReceivedMessage);
    return () => {
      createdSocket.disconnect();
    };
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  let innerHeight = window.innerHeight;

  return (
    <div className="room">
      <div className="header">
        {user && (
          <Link to={`/group/`}>
            <button className="back">Back</button>
          </Link>
        )}

        {user && (
          <Link to={`/group/profile/${id}`}>
            <button className="settings">Settings</button>
          </Link>
        )}

        {group && <h1>{group.name}</h1>}
      </div>
      <div className="chat" style={{ height: innerHeight - 136 }}>
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <p className="grey">{message.user.name}:</p>
              <p>{message.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <form className="message" onSubmit={handleSubmission}>
        <button>
          <img className="send" src="/images/send.svg" alt="send message" />
        </button>
        <input
          maxLength={1000}
          type="text"
          placeholder="Message here..."
          onChange={handleContentChange}
          value={content}
        />
      </form>
    </div>
  );
};

export default RoomPage;
