import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => (
  <div>
    <Link to={`/group/${group._id}`}>
      <p>{group.name} </p>
      <br />
    </Link>
    <p>{group.description}</p>
  </div>
);

export default GroupCard;
