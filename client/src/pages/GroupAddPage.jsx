import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupAdd } from '../services/group';
import GroupForm from '../components/GroupForm';

const GroupAddPage = () => {
  const [group, setGroup] = useState({
    name: 'Enter group name',
    description: 'Add description'
  });

  const navigate = useNavigate();

  const handleGroupCreation = () => {
    groupAdd(group).then((data) => {
      console.log(data);
      const id = data.group._id;
      console.log(id);
      navigate(`/group/${id}`);
    });
  };

  return (
    <div>
      <h1>Add New Group</h1>
      <GroupForm
        group={group}
        onGroupChange={setGroup}
        onGroupSubmit={handleGroupCreation}
        buttonLabel="Add new Group"
      />
    </div>
  );
};

export default GroupAddPage;
