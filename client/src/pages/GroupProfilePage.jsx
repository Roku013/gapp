import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { groupLoad, groupRemove } from '../services/group';

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
    <div className="group-settings">
      <div className="header">
        {user && (
          <Link to={`/group/`}>
            <button className="back">Back</button>
          </Link>
        )}
        <h1>Group Settings</h1>
      </div>
      {user && group && (
        <div className="group-info">
          <img src={group.picture} alt="" />
          <h1>{group.name}</h1>
          <p>
            <small>Group description: </small>
            <br></br> {group.description}
          </p>
          <p>
            <small>Group owner: </small>
            <br></br>
            {group.creator.name}
          </p>
          <p>
            <small>Group Members: </small>
            <br></br>
            {group.members.map((member) => member.name).join(', ')}
          </p>
          {group.creator._id === user._id && (
            <div>
              <Link to={`/group/edit/${id}`}>
                <button className="-green">Edit group</button>
              </Link>

              <Link to={`/group/${id}/member/add`}>
                <button className="-green">Add/Remove members</button>
              </Link>

              <form
                method="DELETE"
                action="/group"
                onSubmit={handleGroupRemoval}
              >
                <button className="-red">Delete group</button>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="navigation-bottom">
        <div className="circle">
          <Link className="active" to={`/group/${id}`}>
            <img
              className="groups-icon"
              src="/images/groups.svg"
              alt="Groups"
            />
          </Link>
          {user && (
            <Link to={`/profile/${user._id}`}>
              <img
                className="profile-icon"
                src="/images/profile.svg"
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupProfilePage;
