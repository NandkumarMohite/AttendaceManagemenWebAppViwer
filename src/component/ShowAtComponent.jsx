import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './css/adminUserView.css'

import './css/ShowAttendance.css'; // Import your CSS file for this component

const ShowAttendance = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useParams();
  const userName = localStorage.getItem('userName');

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
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
          }
        });
        setUserData(convertedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const convertToIndianDate = (dateTimeString) => {
    return moment(dateTimeString).tz('Asia/Kolkata').format('MMMM DD, YYYY');
  };

  const convertToIndianTime = (dateTimeString) => {
    return moment(dateTimeString).tz('Asia/Kolkata').format('hh:mm:ss A');
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="attendance-container">
          <h2 className="welcome-message">Welcome, {userName}</h2>
          <div className="user-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>SignIn Time</th>
                  <th>SignOut Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.date}</td>
                    <td>{user.singInTime}</td>
                    <td>{user.signOutTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {userData.length > itemsPerPage && (
              <div className="pagination-container">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={userData.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass={`page-item ${activePage === currentPage ? 'active' : ''}`}
                linkClass="page-link"
              />
               </div>
            )}
           
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAttendance;
