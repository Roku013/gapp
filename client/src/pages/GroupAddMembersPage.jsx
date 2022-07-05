import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { groupMemberAdd, groupMemberSearch } from '../services/group';

const GroupAddMemberPage = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

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

      <p>Added members: </p>
    </div>
  );
};

export default GroupAddMemberPage;
