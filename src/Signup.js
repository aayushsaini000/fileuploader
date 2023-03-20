import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const payload = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    try {
      const response = await axios.post(
        'http://65.108.77.50:3002/signup',
        payload
      );
      if (response.status === 200) {
        console.log(response.data);
        // clear the form
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        // redirect to the specified page
        navigate('/');
      } else {
        setIsLoading(false)
        console.log('Error:', response.status);
        // display an error message
        // you can use a library like react-toastify or display it in an alert
      }
    } catch (error) {
      setErrorText(error.response?.data?.error)
      setIsLoading(false)
      console.log(error);
      // display an error message
      // you can use a library like react-toastify or display it in an alert
    }
  };


  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <p className='errorText'>{errorText}</p>
        <button type="submit" className="btn btn-primary">
          {isLoading ? <Loader /> : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
