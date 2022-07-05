import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import MyTaskPage  from './components/myTaskPage/myTaskPage';
import Register from './components/register';
import ProfilePage from './components/myProfilePage/profilePage';
import MemberPage from './components/memberPage/memberPage';
import HomePage from './components/homePage/HomePage';

function App() {
  const [email, setUserEmail] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserEmail={setUserEmail} />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home/*" element={<HomePage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
