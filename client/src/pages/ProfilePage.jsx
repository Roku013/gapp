import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { profileLoad } from "../services/profile";
import { signOutUser } from "../services/authentication";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationContext from "../context/authentication";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    profileLoad(id).then((data) => {
      setProfile(data.profile);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSignout = (event) => {
    event.preventDefault();
    signOutUser(id).then(() => {
      // setProfile(response.data);
      navigate("/");
    });
  };

  return (
    <div className='profile-page'>
      <div className='header'>
        {user && user._id === id && (
          <button
            className='settings'
            onClick={() => navigate("/profile/edit")}
          >
            Settings
          </button>
        )}
        <form onSubmit={handleSignout}>
          <button className='sign-out'>Logout</button>
        </form>
        <h1>Profile</h1>
      </div>
      {profile && (
        <div className='user-info'>
          <img
            className='profile-img'
            src={
              profile.picture ||
              "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            }
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
        </div>
      )}

      <div className='group-list-slide'>
        <p>
          <Link to='/group'>Groups</Link>
        </p>
      </div>

      <div className='event-list-slide'>
        <p>
          <Link to='/group'>Events</Link>
        </p>
      </div>
      <div className='navigation-bottom'>
        <div className='circle'>
          <Link to='/group'>
            <img
              className='groups-icon'
              src='/images/groups.svg'
              alt='Groups'
            />
          </Link>
          <Link to='/group'>
            <img className='events-icon' src='/images/event.svg' alt='Events' />
          </Link>
          <Link className='active' to='/group'>
            <img
              className='profile-icon'
              src='/images/profile.svg'
              alt='Profile'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
