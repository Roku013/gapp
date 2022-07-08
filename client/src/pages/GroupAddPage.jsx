import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { groupAdd } from "../services/group";
import GroupForm from "../components/GroupForm";
import AuthenticationContext from "../context/authentication";

const GroupAddPage = () => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    picture: ""
  });

  const navigate = useNavigate();

  const handleGroupCreation = () => {
    groupAdd(group).then((data) => {
      const id = data.group._id;
      navigate(`/group/${id}/member/add`);
    });
  };
  const { user } = useContext(AuthenticationContext);

  return (
    <div className='group-add'>
      <div className='header'>
        <Link to='/group'>
          <button className='back'>Back</button>
        </Link>

        <h1>Compose group</h1>
      </div>
      {/* <h1>Create New Group</h1> */}

      <GroupForm
        group={group}
        onGroupChange={setGroup}
        onGroupSubmit={handleGroupCreation}
        buttonLabel='Next'
      />
      <div className='navigation-bottom'>
        <div className='circle'>
          <Link className='active' to='/group'>
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

export default GroupAddPage;
