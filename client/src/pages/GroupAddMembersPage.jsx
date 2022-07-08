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
    groupMemberAdd(id, member).then((data) => {
      navigate(`/group/${id}/member/add`);
    });
  };

  const handleGroupDeletion = (member) => {
    groupMemberDelete(id, member).then((data) => {
      navigate(`/group/${id}/member/add`);
    });
  };
  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      <h1>Add new members</h1>
      <MemberForm
        member={name}
        onSearchQueryChange={setName}
        onSearchSubmit={handleMemberSearch}
        buttonLabel="Add new member"
      />

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <img src="" alt="" />
            <span>{user.name}</span>
            <button onClick={() => handleMemberAddition(user._id)}>+</button>
          </li>
        ))}
      </ul>

      <ul>
        {user && group && (
          <>
            <div>
              <p>
                Added members:
                <li key={user._id}>
                  <img width="50px" src={user.picture} alt="profile pic" />
                  {group.members.map((member) => member.name).join(', ')}
                </li>
              </p>
            </div>

            <ul>
              {group.members.map((member) => (
                <li key={user._id}>
                  <span>{member.name}</span>
                  <button onClick={() => handleGroupDeletion(user._id)}>
                    -
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </ul>

      <Link to="/group">
        <button className="-green">Done</button>
      </Link>
    </div>
  );
};

export default GroupAddMembersPage;
