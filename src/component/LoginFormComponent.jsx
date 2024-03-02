import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/loginComponent.css';

const LoginFormComponent = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIdErr, setEmailIdErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [message, setMessage] = useState('');
  const [errormsg, setErrorMsg] = useState('');
  const [isError, setError] = useState(false);

  function handleNavigate() {
    navigate('/signup');
  }

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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password) {
      const userData = {
        email,
        password,
      };

      try {
        const response = await axios.post('http://localhost:8080/user/signin', userData, {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });

        console.log(response.data.id);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.userName);

        if (response.data.userRole === 'Admin') {
          navigate('user/admin/users');
        }else{
          navigate('/Welcome');
        }

        onLogin(response.data);
      } catch (error) {
        console.error(`Error during login: ${error.message}`);
        setError(true);
        setErrorMsg('Invalid email or password');
      }
    } else {
      setError(true);
      setErrorMsg(' All Fields are  Required.');
    }
  };

  return (
    <div className="parent-card">
      <div className="card">
        <div className="card-body">
          {!email && !password && isError ? (
            <div className="validation" style={{ color: 'red', fontSize: '17px' }}>
              {errormsg}
            </div>
          ) : null}
          <h3>USER LOGIN</h3>
          <div className={`input-group ${emailIdErr ? 'error' : ''}`}>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={emailIdValidation}
            />
            <br />
            {emailIdErr ? (
              <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
                Invalid Email Address
              </div>
            ) : null}
          </div>
          <div className={`input-group ${passwordErr ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={passwordHandler}
            />
            <br />
            {passwordErr ? (
              <div className="validation" style={{ color: 'red', fontSize: '13px' }}>
                Enter Password with a minimum of 5 characters
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <center>
              <button onClick={handleSubmit}>SIGN IN</button>
              <div className="signupAcc">
                <p className="login-link">
                  Already have an account ? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;
