import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
// import LogInPage from './pages/LogInPage';
import RoomPage from './pages/RoomPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';

// import Navbar from './components/Navbar';
import AuthenticationContext from './context/authentication';
import { loadUserInformation } from './services/authentication';
import GroupPage from './pages/GroupPage';
import SingleGroupPage from './pages/SingleGroupPage';
import GroupAddPage from './pages/GroupAddPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserInformation().then((data) => {
      setUser(data.user);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />

          <Route path="/group" element={<GroupPage />} />
          <Route path="/add" element={<GroupAddPage />} />
          <Route path="/group/:id" element={<SingleGroupPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path='/' element={<LogInPage />} /> */}
          <Route path="/room/:id" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
};

export default App;
