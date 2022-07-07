import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import {
  groupLoad,
  groupMemberAdd,
  groupMemberSearch
} from '../services/group';
import AuthenticationContext from '../context/authentication';

const GroupAddMemberPage = (req) => {
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
      navigate(`/group/${id}`);
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
      {user && group && (
        <div>
          <p>Added members: </p>
          <p>
            members: {group.members.map((member) => member.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupAddMemberPage;
