// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navigation-bottom">
      <div className="circle">
        <Link to="/group">
          <img className="groups-icon" src="/images/groups.svg" alt="Groups" />
        </Link>
        <Link to="/group">
          <img className="events-icon" src="/images/event.svg" alt="Events" />
        </Link>
        <Link className="active" to="/group">
          <img
            className="profile-icon"
            src="/images/profile.svg"
            alt="Profile"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
