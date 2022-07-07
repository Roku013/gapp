import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import AuthenticationForm from '../components/AuthenticationForm';
import { profileEdit, profileLoad } from '../services/profile';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user) {
      profileLoad(user._id).then((data) => setProfile(data.profile));
    }
  }, [user]);

  const handleProfileEdit = () => {
    let id = user._id;
    console.log(id);
    profileEdit(id, profile).then((data) => {
      setUser(data.profile);
      navigate(`/profile/${id}`);
    });
  };

  return (
    <div>
      {/* <div className="header-profile-edit">
        <Link to={`/profile/${id}`}>
          <button className="back">Back</button>
        </Link>

        <h1>Edit Profile</h1>
      </div> */}

      <h1>Edit Profile</h1>
      {profile && (
        <AuthenticationForm
          user={profile}
          buttonLabel="Edit Profile"
          displayInputs={['name', 'email', 'picture']}
          onUserChange={setProfile}
          onAuthenticationSubmit={handleProfileEdit}
        />
      )}

      <div className="navigation-bottom">
        <div className="circle">
          <Link to="/group">
            <img
              className="groups-icon"
              src="/images/groups.svg"
              alt="Groups"
            />
          </Link>

          <Link className="active" to={`/profile/${user._id}`}>
            <img
              className="profile-icon"
              src="/images/profile.svg"
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
