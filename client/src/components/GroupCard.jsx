import { Link } from "react-router-dom";

const GroupCard = ({ group }) => (
  <div className='group-card'>
    <Link to={`/group/${group._id}`}>
      <div className='image'>
        <img src={group.picture || "/images/backup-image.png"} alt='' />
      </div>
      <div className='info'>
        <h2>{group.name} </h2>
        <p>{group.description}</p>
      </div>
    </Link>
  </div>
);

export default GroupCard;
