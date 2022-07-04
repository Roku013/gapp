import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { listGroups } from '../services/group';
import AuthenticationContext from '../context/authentication';

const GroupPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    listGroups().then((data) => {
      setGroups(data.groups);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);
  // console.log(user);

  return (
    <div>
      {!user && <p>log in to see the list of groups</p>}

      {user && (
        <div>
          <Link to={`/profile/${user._id}`}>Back</Link>
          <p>
            <Link to="/add">CREATE NEW GROUP</Link>
          </p>
          <h1>Groups</h1>
          {groups.map((group) => (
            <p key={group._id}>
              <GroupCard group={group} />
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupPage;
