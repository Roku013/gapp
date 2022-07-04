import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupForm from '../components/GroupForm';
import { groupEdit, groupLoad } from '../services/group';

const GroupEditPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  const navigate = useNavigate();

  const handleGroupEdit = () => {
    groupEdit(id, group).then(() => {
      navigate(`/group/${id}`);
    });
  };

  useEffect(() => {
    groupLoad(id).then((data) => setGroup(data.group));
  }, [id]);

  return (
    <div>
      <h1>Edit Group</h1>
      {group && (
        <GroupForm
          group={group}
          onGroupChange={setGroup}
          onGroupSubmit={handleGroupEdit}
          buttonLabel="Edit Group"
        />
      )}
    </div>
  );
};

export default GroupEditPage;
