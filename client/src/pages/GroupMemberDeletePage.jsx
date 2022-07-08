import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { groupMemberDelete } from '../services/group';

const GroupMemberDeletePage = (req) => {
  const { id } = useParams();
  const { member } = req.body;
  console.log('cxccx');
  // const [group, setGroup] = useState(null);

  useEffect(() => {
    groupMemberDelete(id, member);
  }, [id, member]);

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
