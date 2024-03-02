import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './css/Headercomponent.css'

const HeaderComponent = () => {

  const userName = localStorage.getItem('userName');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
   
  function handleLogoutButton(){
        localStorage.clear()
        setIsLoggedIn(false);
        console.log(isLoggedIn)
        navigate('/')
    
    
    }
    
  return (
    <header className="header-container">
      <div className="company-name">Attendence App</div>
      {/* <div><p>{localStorage.getItem('userName')}</p></div> */}
      <div className="logout-button" >
      
        <div>
        <button onClick={handleLogoutButton} style={{backgroundColor:"blue"}}>Logout</button> 
        </div>
       
      </div>
    </header>
  );
};

export default HeaderComponent;
