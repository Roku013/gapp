import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => (
  <div>
    <Link to={`/group/${group._id}`}>
      <button>{group.name} </button>
    </Link>
    <p className="grp-description">{group.description}</p>
  </div>
);

export default GroupCard;
