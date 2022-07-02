import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthenticationContext from "../context/authentication";
import { profileLoad, profileEdit } from "../services/profile";
import { useNavigate } from "react-router-dom";

const ProfileEditPage = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user) {
      profileLoad(user._id).then((data) => setProfile(data.profile));
    }
  }, [user]);

  const handleEditProfile = () => {
    profileEdit(profile).then((data) => {
      setUser(data.profile);
      navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={handleEditProfile}>
        <input
          id='input-name'
          placeholder='Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          id='input-email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button className='-green'>Edit profile</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
