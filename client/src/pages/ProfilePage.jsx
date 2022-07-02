import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    <div>
      {profile && (
        <div className='profile-info'>
          <img
            src={
              profile.picture
              // <FontAwesomeIcon icon='fa-solid fa-circle-user' />
            }
            alt
          />
          <h1>{profile.name}</h1>
        </div>
      )}
      <div className='user-options'>
        {user && user._id === id && (
          <Link className='settings-profile' to='/profile/edit'>
            Settings
          </Link>
        )}
        <h1>Profile</h1>
        <form onSubmit={handleSignout}>
          <button className='sign-out'>Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
