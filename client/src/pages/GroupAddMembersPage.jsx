import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import {
  groupLoad,
  groupMemberAdd,
  groupMemberDelete,
  groupMemberSearch
} from '../services/group';
import AuthenticationContext from '../context/authentication';

const GroupAddMembersPage = (req) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    groupLoad(id).then((data) => setGroup(data.group));
  }, [id]);

  const navigate = useNavigate();

  const handleMemberSearch = () => {
    groupMemberSearch(id, name).then((data) => {
      setUsers(data.users);
    });
  };

  const handleMemberAddition = (member) => {
    window.location.reload(true);
    groupMemberAdd(id, member).then((data) => {
      navigate(`/group/${id}/member/add`);
    });
  };

  const handleGroupMemberDeletion = (id, group) => {
    groupMemberDelete(id, group); /* .then((data) => {
       navigate(`/group/${id}/member/add`);
    }); */
  };
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="group-manage-members">
      <h1>Add new members</h1>
      <MemberForm
        member={name}
        onSearchQueryChange={setName}
        onSearchSubmit={handleMemberSearch}
        buttonLabel="Add new member"
      />

      <ul>
        {users.map((user) => (
          <li className="members-card" key={user._id}>
            <img
              className="members-profile-pic"
              src={user.picture || '/images/green default profile picture.jpg'}
              alt="profile pic"
              width="50px"
            />
            <span className="member-name">{user.name}</span>
            <form action=""></form>
            <button
              className="no-style-btn"
              onClick={() => handleMemberAddition(user._id)}
            >
              <img src="/images/plus-icon.svg" alt="plus icon" />
            </button>
          </li>
        ))}
      </ul>

      <ul>
        {user && group && (
          <>
            <p>Added members:</p>

            <ul>
              {group.members.map((member) => (
                <li className="members-card" key={member._id}>
                  <img
                    className="members-profile-pic"
                    src={
                      member.picture ||
                      '/images/green default profile picture.jpg'
                    }
                    alt="profile pic"
                  />
                  <span className="member-name"> {member.name}</span>
                  <form
                    method="DELETE"
                    //  action="/group"
                    onClick={() =>
                      handleGroupMemberDeletion(member._id, group._id)
                    }
                  >
                    <button className="no-style-btn">
                      <img src="/images/minus-icon.svg" alt="minus icon" />
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </>
        )}
      </ul>

      <Link to="/group">
        <button className="-green">Done</button>
      </Link>

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

export default GroupAddMembersPage;
