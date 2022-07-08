import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthenticationContext from "../context/authentication";
import { groupLoad, groupRemove } from "../services/group";

const GroupProfilePage = (req) => {
  const { id } = useParams();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    groupLoad(id).then((data) => setGroup(data.group));
  }, [id]);

  const handleGroupRemoval = () => {
    groupRemove(id);
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {user && <Link to={`/group/`}>Back</Link>}
      <h1> group profile page </h1>
      {user && group && (
        <div>
          <img
            src={group.picture || "/images/group-profile-avatar.svg"}
            alt={group.name}
          />
          <p>name: {group.name}</p>
          <p>creator: {group.creator.name}</p>
          <p>description: {group.description}</p>
          <p>
            members: {group.members.map((member) => member.name).join(", ")}
          </p>

          {group.creator._id === user._id && (
            <div>
              <form
                method='DELETE'
                action='/group'
                onSubmit={handleGroupRemoval}
              >
                <button className='-green'>Delete group</button>
              </form>
              <br />
              <Link to={`/group/edit/${id}`}>
                <button className='-green'>Edit group</button>
              </Link>

              <br />
              <Link to={`/group/${id}/member/add`}>
                <button className='-green'>Add/Remove members</button>
              </Link>
              <br />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupProfilePage;
