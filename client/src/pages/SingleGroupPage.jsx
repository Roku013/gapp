import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { groupLoad } from '../services/group';

const SingleGroupPage = () => {
  const { id } = useParams();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    groupLoad(id).then((data) => setGroup(data.group));
  }, [id]);

  console.log(group);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      <h3>single group page</h3>
      {group && (
        <div>
          <p>name: {group.name}</p>
          <p>creator: {group.creator.name}</p>
          <p>description: {group.description}</p>
          <p>members: {group.members}</p>
        </div>
      )}
    </div>
  );
};

export default SingleGroupPage;
