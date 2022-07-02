import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { listGroups } from '../services/group';

const GroupPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    listGroups().then((data) => {
      setGroups(data.groups);
    });
  }, []);

  console.log(groups);
  return (
    <div>
      <p>
        <Link to="/add">CREATE NEW GROUP</Link>
      </p>

      <h1>List of groups</h1>

      {groups.map((group) => (
        <p key={group._id}>
          <GroupCard group={group} />
        </p>
      ))}
    </div>
  );
};

export default GroupPage;
