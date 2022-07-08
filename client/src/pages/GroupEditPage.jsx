import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import GroupForm from "../components/GroupForm";
import AuthenticationContext from "../context/authentication";
import { groupEdit, groupLoad } from "../services/group";

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

  const { user } = useContext(AuthenticationContext);
  return (
    <div>
      <h1>Edit Group</h1>
      {group && (
        <GroupForm
          group={group}
          onGroupChange={setGroup}
          onGroupSubmit={handleGroupEdit}
          buttonLabel='Edit Group'
        />
      )}
      <div className='navigation-bottom'>
        <div className='circle'>
          <Link className='active' to={`/group/${id}`}>
            <img
              className='groups-icon'
              src='/images/groups.svg'
              alt='Groups'
            />
          </Link>
          {user && (
            <Link to={`/profile/${user._id}`}>
              <img
                className='profile-icon'
                src='/images/profile.svg'
                alt='Profile'
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupEditPage;
