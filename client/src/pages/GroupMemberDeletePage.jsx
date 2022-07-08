import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { groupRemove } from '../services/group';

const GroupMemberDeletePage = () => {
  const { id } = useParams();
  // const [group, setGroup] = useState(null);

  useEffect(() => {
    groupRemove(id);
  }, [id]);

  return (
    <div>
      GroupMemberDeletePage
      <form method="DELETE" action="/group">
        <button>Delete group</button>
      </form>
    </div>
  );
};

export default GroupMemberDeletePage;
