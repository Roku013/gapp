import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { logInUser } from '../services/authentication';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(AuthenticationContext);

  const handleLogIn = (event) => {
    event.preventDefault();
    logInUser({ email, password }).then((data) => {
      setUser(data.user);
      const id = data.user._id;
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
    <div className="bg-color">
      <img className="logo" src="/images/logo.png" alt="Gapp logo" />
      <h1>Log in</h1>
      {/* login form */}
      <form onSubmit={handleLogIn}>
        <input
          id="input-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="password-container">
          <p className="password" onClick={togglePassword}>
            Show
          </p>
          <input
            id="input-password"
            type={passwordShown ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="-green">Log In</button>
      </form>
      <p>
        No account yet?
        <Link to="/register">Sign up!</Link>
      </p>
      <div>
        <img className="home-bg" src="/images/BG6.svg" alt="Gapp logo" />
      </div>
    </div>
  );
};

export default HomePage;
