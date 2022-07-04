import { useContext } from "react";
import { useState } from "react";
import AuthenticationContext from "../context/authentication";
import { profileEdit } from "../services/profile";
import { useNavigate } from "react-router-dom";

const ProfileEditPage = () => {
  // const [setProfile] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);
  // useEffect(() => {
  //   if (user) {
  //     profileLoad(user._id).then((data) => setProfile(data.profile));
  //   }
  // });

  const handleEditProfile = () => {
    let id = user._id;
    let userEdit = { name, email, picture };
    profileEdit(id, userEdit).then((data) => {
      //setUser(data.profile);
    });
    navigate(`/profile/${id}`);
  };

  return (
    <div className='edit-form'>
      <form onSubmit={handleEditProfile}>
        <label htmlFor='Name'>Name</label>

        <input
          id='input-name'
          placeholder='Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor='Email'>Email</label>

        <input
          id='input-email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor='Picture'>Picture</label>

        <input
          id='input-picture'
          type='file'
          accept='image/*'
          placeholder='Picture'
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />
        <button className='-green edit-btn'>Edit profile</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
