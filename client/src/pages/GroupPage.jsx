import React from 'react';
import { useEffect, useState } from 'react';
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
      <h2>List of groups</h2>
      {groups.map((group) => (
        <p>
          <GroupCard key={group._id} group={group} />
        </p>
      ))}
    </div>
  );
};

export default GroupPage;
