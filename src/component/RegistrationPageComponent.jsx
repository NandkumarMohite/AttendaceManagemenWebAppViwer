import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './css/Regester.css';

const RegistrationPageComponent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
  const [emailIdErr, setEmailIdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [mobNoErr, setMobNoErr] = useState(false);
  const [isError, setError] = useState(false);
  const [errormsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Username':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'mobile':
        setMobNo(value);
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return regex.test(email);
  };

  const emailIdValidation = (e) => {
    let item = e.target.value;
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regex.test(item)) {
      setEmailIdErr(false);
    } else if (!regex.test(email) && email !== '') {
      setEmailIdErr(true);
    } else {
      setEmailIdErr(true);
    }
    setEmail(item);
  };

  const passwordHandler = (e) => {
    let item = e.target.value;
    if (item.length < 5) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    setPassword(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;

    if (!userName) {
      setUserNameErr(true);
      valid = false;
    } else {
      setUserNameErr(false);
    }

    if (!validateEmail(email)) {
      setEmailErr(true);
      valid = false;
    } else {
      setEmailErr(false);
    }

    if (password.length < 5) {
      setPasswordErr(true);
      valid = false;
    } else {
      setPasswordErr(false);
    }

    if (!mobNo) {
      setMobNoErr(true);
      valid = false;
    } else {
      setMobNoErr(false);
    }

    if (!valid) {
      setError(true);
      setErrorMsg('Please fill in all fields correctly.');
      return;
    }

    try {
      const userData = {
        userName,
        email,
        password,
        mobNo,
      };

      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Registration successful');
        console.log('Registration successful. Response:', response.data);
        navigate('/');
      } else {
        toast.error('Registration failed. Please try again.');
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="parent-card">
    <div className="registration-container">
      <div className='card-body1'>
      <p>{isError && (
          <div className="validation" style={{ color: 'red', fontSize: '17px' }}>
            {errormsg}
          </div>
        )}</p>
        <h3>CREATE ACCOUNT</h3>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input
            placeholder='Enter Username'
            type="text"
            name="Username"
            value={userName}
            onChange={handleChange}
          />
        </label>
        {/* {userNameErr && (
          <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
            Username is required.
          </div>
        )} */}
        
      
          
          <input
          placeholder='Enter Email'
            type="email"
            name="email"
            value={email}
            onChange={emailIdValidation}
          />
      
       
        {emailIdErr ? (
            <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
              Invalid Email Address
            </div>
          ) : null }
        {/* {emailErr && (
          <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
            Invalid Email Address
          </div>
        )} */}
        
      
          
          <input
           placeholder='Enter Password'
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
          
          {passwordErr ? (
            <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
              Enter Password with a minimum of 5 characters
            </div>
          ) : null}
        
        {/* {passwordErr && (
          <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
            Enter Password with a minimum of 5 characters
          </div>
        )} */}
        
        <label>
         
          <input
          placeholder='Enter Mobile'
            type="tel"
            name="mobile"
            value={mobNo}
            onChange={handleChange}
          />
        </label>
        
        
        <button type="submit" style={{marginTop: '20px'}}>SIGN UP</button>
        {/* {isError && (
          <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
            {errormsg}
          </div>
        )} */}
      </form>
      <p className="login-link">
        Already have an account? <Link to="/">Sign In</Link>
      </p>
      </div>
    </div>
    </div>
  );
};

export default RegistrationPageComponent;
