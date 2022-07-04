import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberForm from '../components/MemberForm';
import { groupMemberAdd } from '../services/group';

const GroupAddMemberPage = () => {
  const [member, setMember] = useState({ name: [] });

  const navigate = useNavigate();

  const handleMemberAddition = () => {
    groupMemberAdd(member).then((data) => {
      const id = data.member._id;

      console.log(id);
      navigate(`/group/${id}`);
    });
  };

  return (
    <div>
      <h1>Add new members</h1>
      <MemberForm
        member={member}
        onMemberChange={setMember}
        onMemberSubmit={handleMemberAddition}
        buttonLabel="Add new member"
      />

      <p>Added members: </p>
    </div>
  );
};

export default GroupAddMemberPage;
