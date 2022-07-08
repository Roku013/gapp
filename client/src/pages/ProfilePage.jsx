import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { profileLoad } from '../services/profile';
import { signOutUser } from '../services/authentication';
import GroupCard from '../components/GroupCard';
import AuthenticationContext from '../context/authentication';
import { listGroups } from '../services/group';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    profileLoad(id).then((data) => {
      setProfile(data.profile);
    });
  }, [id]);

  useEffect(() => {
    listGroups(id).then((data) => {
      setGroups(data.groups);
    });
  }, [id]);

  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSignout = (event) => {
    event.preventDefault();
    signOutUser(id).then(() => {
      // setProfile(response.data);
      navigate('/');
    });
  };

  // console.log(groups.length);

  return (
    <div className="profile-page">
      <div className="header">
        {user && user._id === id && (
          <button
            className="settings"
            onClick={() => navigate('/profile/edit')}
          >
            Settings
          </button>
        )}
        <form onSubmit={handleSignout}>
          <button className="sign-out">Logout</button>
        </form>
        <h1>Profile</h1>
      </div>
      {profile && (
        <div className="user-info">
          <img
            className="profile-img"
            src={profile.picture || '/images/green default profile picture.jpg'}
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
        </div>
      )}

      {/* Im not allowed to use length */}

      <div className={groups.length === 0 ? 'profile-img' : 'none'}>
        <img src="/images/profile-img.svg" alt="profileimage" />
      </div>

      <div className="group-list-slide">
        {Boolean(groups) && (
          <>
            {groups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}
          </>
        )}
      </div>

      <div className="navigation-bottom">
        <div className="circle">
          <Link to="/group">
            <img
              className="groups-icon"
              src="/images/groups.svg"
              alt="Groups"
            />
          </Link>
          <Link className="active" to={`/profile/${id}`}>
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

export default ProfilePage;
