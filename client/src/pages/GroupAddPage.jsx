import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupAdd } from '../services/group';
import GroupForm from '../components/GroupForm';

const GroupAddPage = () => {
  const [group, setGroup] = useState({
    name: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleGroupCreation = () => {
    groupAdd(group).then((data) => {
      const id = data.group._id;
      navigate(`/group/${id}`);
    });
  };

  return (
    <div>
      <h1>Create New Group</h1>
      <GroupForm
        group={group}
        onGroupChange={setGroup}
        onGroupSubmit={handleGroupCreation}
        buttonLabel="Create new Group"
      />
    </div>
  );
};

export default GroupAddPage;
