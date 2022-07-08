import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      navigate(`/group/${id}/member/add`);
    });
  };

  return (
    <div className="group-add">
      <div className="header">
        <Link to="/group">
          <button className="back">Back</button>
        </Link>

        <h1>Compose group</h1>
      </div>
      {/* <h1>Create New Group</h1> */}
      <GroupForm
        group={group}
        onGroupChange={setGroup}
        onGroupSubmit={handleGroupCreation}
        buttonLabel="Next"
      />
    </div>
  );
};

export default GroupAddPage;
