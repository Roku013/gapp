import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => (
  <Link to={`/group/${group._id}`}>
    <span>{group.name} </span>
  </Link>
);

export default GroupCard;
