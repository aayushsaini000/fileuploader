import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader'

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'http://176.9.137.77:3002/login',
        payload, {
        headers: {
        }
      }
      );
      if (response.status === 200) {
        localStorage.setItem('loginData', JSON.stringify(response.data.user))
        localStorage.setItem('isLoggedIn', true)
        navigate('/upload')
      }
      else
        setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error.response?.data)
        setErrorText(error.response?.data?.error)
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
          <p className='errorText'>{errorText}</p>
          <button type="submit" className="btn login-btn">
            {isLoading ? <Loader /> : 'Login'}
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
