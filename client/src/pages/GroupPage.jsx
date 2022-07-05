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

  return (
    <div className="group-page">
      {!user && <p>log in to see the list of groups</p>}
      {user && (
        <div className="group-info">
          <Link className="return-btn" to={`/profile/${user._id}`}>
            BACK
          </Link>

          <Link to="/add">
            <p className="create-group">+</p>
          </Link>

          <h1 className="group-topic">Groups</h1>

          {groups.map((group) => (
            <div className="group-name" key={group._id}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      )}
      <div className="navigation-bottom">
        <div className="circle">
          <Link className="active" to="/group">
            <img
              className="groups-icon"
              src="/images/groups.svg"
              alt="Groups"
            />
          </Link>
          <Link to="/group">
            <img className="events-icon" src="/images/event.svg" alt="Events" />
          </Link>
          {user && (
            <Link to={`/profile/${user._id}`}>
              <img
                className="profile-icon"
                src="/images/profile.svg"
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
