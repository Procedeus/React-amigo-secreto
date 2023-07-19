import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Tables from './Components/Tables/Tables/tables';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import Logout from './Components/Logout/logout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Tables/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
