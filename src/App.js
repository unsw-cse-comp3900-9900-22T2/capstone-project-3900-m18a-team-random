import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import MyTaskPage  from './components/myTaskPage/myTaskPage';
import Register from './components/register';
import ProfilePage from './components/myProfilePage/profilePage';
import TeamPage from './components/myTeamPage/teamPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/main" element={<MyTaskPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/team" element={<TeamPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
