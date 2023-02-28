import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      username: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'https://stand-app.com/api/v2/user/login/',
        payload, {
        headers: {
          Authorization: 'Basic YmRkMTc5NTY5MmQ1NTBiMWIwY2M0YmUzZmJkN2MyMTY6ZTczYTdhNDhjNDYzNDM5Nzg1MTUyNTI4MWE4NzdkMWY='
        }
      }
      );
      if (response.status === 200) {
        navigate('/upload')
      }
    } catch (error) {
      if (error.response?.data)
        setErrorText(error.response?.data?.detail)
      console.log(error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <p>{errorText}</p>
          <button type="submit" className="btn login-btn">
            Login
          </button>
        </form>
        <div className="signup-container">
          <p className="signup-text">Don't have an account?</p>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
