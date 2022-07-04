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
  }, [id]);

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
      <div className='user-options'>
        {user && user._id === id && (
          <button
            className='settings-profile'
            onClick={() => navigate("/profile/edit")}
          >
            Settings
          </button>
        )}
        <h1 className='profile-name'>Profile</h1>
        <form onSubmit={handleSignout}>
          <button className='sign-out'>Logout</button>
        </form>
      </div>
      {profile && (
        <header className='user-info'>
          <img
            className='profile-img'
            src={
              profile.picture ||
              "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            }
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
          <p>
            <Link to='/group'>Group List</Link>
          </p>
        </header>
      )}

      <div className='group-list slide'>
        <h2>Groups</h2>
      </div>
      <div>
        <h2 className='event-list slide'>Events</h2>
      </div>
    </div>
  );
};

export default ProfilePage;
