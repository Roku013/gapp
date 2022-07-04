import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import RoomPage from './RoomPage';

const SingleGroupPage = () => {
  const { id } = useParams();

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {user && <Link to={`/group/`}>Back</Link>}
      {user && <Link to={`/group/profile/${id}`}>Profile</Link>}
      <h1> single group/chat page </h1>

      <RoomPage />
    </div>
  );
};

export default SingleGroupPage;
