import { Link } from "react-router-dom";

const GroupCard = ({ group }) => (
  <div className='group-card'>
    <Link to={`/group/${group._id}`}>
      <button className='-green group-card-name'>{group.name} </button>
    </Link>
    <p className='grp-description'>{group.description}</p>
  </div>
);

export default GroupCard;
