import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { groupRemove } from '../services/group';

const GroupDeletePage = () => {
  const { id } = useParams();
  // const [group, setGroup] = useState(null);

  useEffect(() => {
    groupRemove(id);
  }, [id]);

  return (
    <div>
      GroupDeletePage
      <form method="DELETE" action="/group">
        <button>Delete group</button>
      </form>
    </div>
  );
};

export default GroupDeletePage;
