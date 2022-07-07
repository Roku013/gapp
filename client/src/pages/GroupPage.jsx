import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { groupSearch, listGroups } from '../services/group';
import AuthenticationContext from '../context/authentication';
import GroupSearchForm from '../components/GroupSearchForm';

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState([]);

  useEffect(() => {
    listGroups().then((data) => {
      setGroups(data.groups);
    });
  }, []);

  const handleGroupSearch = () => {
    groupSearch(groupName).then((data) => {
      console.log(data);
      setGroups(data.groups);
    });
  };

  const { user } = useContext(AuthenticationContext);
  //const { group } = useContext(AuthenticationContext);

  return (
    <div className="groups">
      {!user && <p>log in to see the list of groups</p>}
      {user && (
        <div className="header">
          <Link to={`/profile/${user._id}`}>
            <button className="back">Back</button>
          </Link>

          <Link to="/add">
            <button className="create">+</button>
          </Link>

          <h1>Groups</h1>

          {/*<input
            id="input-listed"
            type="text"
            placeholder="Search for group (fix this)"
            // value={name}
            // onChange={(event) => onSearchQueryChange(event.target.value)}
          />
          <ul>
            {groups.map((group) => (
              <li key={group._id}>
                <img src="" alt="" />
                <span>{group.name}</span>
              </li>
            ))}
          </ul> */}

          {/**{groups.map((group) => (
            <div className="" key={group._id}>
              <GroupCard
                group={group}
                groupName={groupName}
                onSearchQueryChange={setGroupName}
                onSearchSubmit={handleGroupSearch}
              />
            </div>
          ))} */}
        </div>
      )}
      <div>
        <GroupSearchForm
          group={groupName}
          onSearchQueryChange={setGroupName}
          onSearchSubmit={handleGroupSearch}
        />
        <ul>
          {groups.map((group) => (
            <li key={group._id}>
              <span>
                <GroupCard
                  group={group}
                  groupName={groupName}
                  onSearchQueryChange={setGroupName}
                  onSearchSubmit={handleGroupSearch}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

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
