import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { groupAdd } from '../services/group';
import GroupForm from '../components/GroupForm';
import AuthenticationContext from '../context/authentication';

const GroupAddPage = () => {
  const [group, setGroup] = useState({
    name: '',
    description: ''
  });

  const { user } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleGroupCreation = () => {
    groupAdd(group).then((data) => {
      const id = data.group._id;
      navigate(`/group/${id}`);
    });
  };

  return (
    <div className="group-add">
      <div className="header">
        <Link to={`/profile/${user._id}`}>
          <button className="back">Back</button>
        </Link>

        <h1>Create new group</h1>
      </div>
      {/* <h1>Create New Group</h1> */}
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
