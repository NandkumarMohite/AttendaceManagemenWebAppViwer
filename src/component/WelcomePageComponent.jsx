import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Welcome.css';
import moment from 'moment-timezone';
import { useMemo } from 'react';


const WelcomePageComponent = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [LoggedIn, setLoggedIn] = useState(true);
     const [In, setIn] = useState(false);
     const [SignInSignOutData , setSignInSignOutData] = useState('')

    const userName = localStorage.getItem('userName')


    useEffect(() => {


    }, []);

    useMemo(() => {
        const userId = localStorage.getItem('userId');
        fetch(`http://localhost:8080/attendence/allAttendence/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const convertedData = data.data.map((user) => ({
            ...user,
            date: convertToIndianDate(user.date),
            singInTime: convertToIndianTime(user.singInTime),
            signOutTime: convertToIndianTime(user.signOutTime),
          }));
          convertedData.forEach((obj, index) => {
            if (obj.singInTime === 'Invalid date' && obj.signOutTime === 'Invalid date') {
              obj.singInTime = obj.signOutTime = 'Absent';
            }
            if (obj.singInTime !== 'Invalid date' && obj.signOutTime === 'Invalid date') {
              obj.signOutTime = 'Session is Alive';
              setSignInSignOutData('Sign Out');
             
            } else{
                setSignInSignOutData('Sign In')  
            }
          });
          console.log("SignInSignOutData=>"+SignInSignOutData)
          console.log("aftewr change=>"+convertedData)
          setUserData(convertedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });

         if (localStorage.getItem('userId')) {
             setUserId(localStorage.getItem('userId'));
             
        }
        
    },[SignInSignOutData])

    const convertToIndianDate = (dateTimeString) => {
        return moment(dateTimeString).tz('Asia/Kolkata').format('MMMM DD, YYYY');
      };
    
      const convertToIndianTime = (dateTimeString) => {
        return moment(dateTimeString).tz('Asia/Kolkata').format('hh:mm:ss A');
      };

    const handleSignOut = async () => {
        try {

            const response = await fetch(`http://localhost:8080/attendence/signout/${userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setLoggedIn(true);
            alert('User Signed Out');   
        } catch (error) {
            console.error('Error during sign out:', error.message);
            toast.error('Error signing out. Please try again.');
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch(`http://localhost:8080/attendence/signin/${userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
            });
        

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

              setLoggedIn(false);
            alert('User Signed In');
            
        } catch (error) {
            console.error('Error during sign in:', error.message);
         
        }
    };
   
    const handleSignInSignOutButton = async()=>{

       (SignInSignOutData === 'Sign In' ) ? handleSignIn() : handleSignOut()
       setSignInSignOutData("Loading.");

    }


    const handleViewReport = () => {
       
        console.log('View Report clicked');
        navigate('/report');
    };

    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const returnDate = currentDateTime.toLocaleString().split(',');
        return returnDate;
    };

    return (
        <>
        <div className="parent-card">
            <div className="card">
                <div className="card-body">
                <p><h3 style={{color:"blue"}}> Welcome , {userName}</h3></p> 
                    <p>{getCurrentDateTime()[0]}</p>
                    <p>{getCurrentDateTime()[1]}</p>
                    <div className="buttonsWelcome">
                        <button>
                                <div className="signOut"  onClick={handleSignInSignOutButton}>{SignInSignOutData}</div>
                        </button>
                        <button onClick={handleViewReport}>View Report</button>
                    </div>
                </div>
            </div>
</div>
        </>
    );
};

export default WelcomePageComponent;
