// RegistrationPage.js

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from "react-router-dom";


const LogoutComponent = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const navigate = useNavigate();
function handleLogoutButton(){
    localStorage.clear()
    setIsLoggedIn(false);
    navigate('/');
    localStorage.setItem('LoginStatus', false)


}

  return (
   <>
   <button onClick={handleLogoutButton}>Logout</button>
   </>
  );
};

export default LogoutComponent;
