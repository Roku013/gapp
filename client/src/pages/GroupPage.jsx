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
        <Link to="/add">ADD NEW GROUP</Link>
      </p>

      <p>
        <h2>List of groups</h2>
      </p>
      {groups.map((group) => (
        <p key={group._id}>
          <GroupCard group={group} />
        </p>
      ))}
    </div>
  );
};

export default GroupPage;
