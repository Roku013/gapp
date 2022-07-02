import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { groupLoad, groupRemove } from '../services/group';

const SingleGroupPage = (req) => {
  const { id } = useParams();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    groupLoad(id).then((data) => setGroup(data.group));
  }, [id]);

  const handleGroupRemoval = () => {
    groupRemove(id);
  };

  const { user } = useContext(AuthenticationContext);
  console.log(user);
  return (
    <div>
      <h3> single group page </h3>
      {group && (
        <div>
          <p>name: {group.name}</p>
          <p>creator: {group.creator.name}</p>
          <p>description: {group.description}</p>
          <p>members: {group.members}</p>

          {group.creator._id === user._id && (
            <div>
              <form
                method="DELETE"
                action="/group"
                onSubmit={handleGroupRemoval}
              >
                <button>Delete group</button>
              </form>
              <Link to={`/group/${id}/edit`} className="btn">
                <button>Edit group</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleGroupPage;
