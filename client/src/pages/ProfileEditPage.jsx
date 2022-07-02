import { useContext, useEffect } from 'react';
import { useState } from 'react';
import AuthenticationContext from '../context/authentication';
import { profileLoad, profileEdit } from '../services/profile';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const [setProfile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);
  useEffect(() => {
    if (user) {
      profileLoad(user._id).then((data) => setProfile(data.profile));
    }
  });

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
      <form onSubmit={handleEditProfile}>
        <input
          id="input-name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          id="input-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button className="-green">Edit profile</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
