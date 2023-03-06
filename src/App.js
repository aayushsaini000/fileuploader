import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import FileUpload from './FileUpload';
import './Login.css';
import './Signup.css';
import './FileUpload.css';
import FileDetails from './FileDetails';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      navigate('/upload');
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/file-info/:id" element={<FileDetails />} />
      </Routes>
    </div>
  );
}

export default App



