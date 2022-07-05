import { useContext } from 'react';
import { useState } from 'react';
import AuthenticationContext from '../context/authentication';
import { profileEdit } from '../services/profile';
import { useNavigate, Link } from 'react-router-dom';

const ProfileEditPage = () => {
  // const [setProfile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);
  // useEffect(() => {
  //   if (user) {
  //     profileLoad(user._id).then((data) => setProfile(data.profile));
  //   }
  // });

  const handleEditProfile = () => {
    let id = user._id;
    let userEdit = { name, email };
    profileEdit(id, userEdit).then(() => {
      //setUser(data.profile);
      return;
    });
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <div className="header-profile-edit">
        <Link to={`/profile/${user._id}`}>
          <button className="back">Back</button>
        </Link>

        <h1>Edit Profile</h1>
      </div>

      <form onSubmit={handleEditProfile}>
        <input
          id="input-name"
          placeholder="New name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          id="input-email"
          type="email"
          placeholder="New email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button className="-green">Update</button>
      </form>
      <div className="navigation-bottom">
        <div className="circle">
          <Link to="/group">
            <img
              className="groups-icon"
              src="/images/groups.svg"
              alt="Groups"
            />
          </Link>
          <Link to="/group">
            <img className="events-icon" src="/images/event.svg" alt="Events" />
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
