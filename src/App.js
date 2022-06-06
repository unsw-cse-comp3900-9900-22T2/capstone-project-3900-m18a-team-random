import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import Main from './components/main.jsx/main';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
