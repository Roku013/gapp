//import { Link } from 'react-router-dom';

const MemberCard = ({ user }) => (
  <div>
    <span>{user.name} </span>
    <br />
    <button>join</button>
  </div>
);

export default MemberCard;
