import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => (
  <div>
    <Link to={`/group/${group._id}`}>
      <span>{group.name} </span>
      <br />
    </Link>
    <small>{group.description}</small>
  </div>
);

export default GroupCard;
