import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { profileLoad } from "../services/profile";
import { signOutUser } from "../services/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <header>
          <img
            src={
              profile.picture || (
                <FontAwesomeIcon icon='fa-solid fa-circle-user' />
              )
            }
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
        </header>
      )}

      {user && user._id === id && (
        <Link className='btn' to='/profile/edit'>
          Edit Profile
        </Link>
      )}
      <form onSubmit={handleSignout}>
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default ProfilePage;
