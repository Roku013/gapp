import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthenticationContext from "../context/authentication";
import { registerUser } from "../services/authentication";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthenticationContext);

  const handleRegistration = (event) => {
    event.preventDefault();
    registerUser({ name, email, password }).then((data) => {
      setUser(data.user);
      const id = data.user._id;
      console.log("my id" + id);

      navigate(`/profile/${id}`);
    });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      {/* <img className="logo" src="/images/logo.png" alt="Gapp logo" /> */}
      <div className='sign-up-nav'>
        <Link to='/'>
          <img className='x' src='/images/x.svg' alt='close button' />
        </Link>
        <h1>Sign up</h1>
      </div>

      <form onSubmit={handleRegistration}>
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
        <div className='password-container'>
          <p className='password' onClick={togglePassword}>
            Show
          </p>
          <input
            id='input-password'
            type={passwordShown ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className='-green'>Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
