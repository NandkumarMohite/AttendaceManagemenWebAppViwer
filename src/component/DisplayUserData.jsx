import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Pagination from 'react-js-pagination';
import './css/DisplayData.css';

const DisplayUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page
  const userName = localStorage.getItem('userName');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    
      fetch(`http://localhost:8080/attendence/allAttendence/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data.data)
          const convertedData = data.data.map((user) => ({
            ...user,
            date: convertToIndianDate(user.date),
            singInTime: convertToIndianTime(user.singInTime),
            signOutTime: convertToIndianTime(user.signOutTime),
          }));
          // convertedData = convertedData.forEach((obj, index) => {
          //   if(obj.singInTime === undefined || obj.singInTime === null ){
          //     obj.singInTime = 'Absent';
          //   }
          // });
          convertedData.forEach((obj, index) => {
            if (obj.singInTime === 'Invalid date' && obj.signOutTime === 'Invalid date') {
              obj.singInTime = obj.signOutTime = 'Absent';
            }
            if (obj.singInTime !== 'Invalid date' && obj.signOutTime === 'Invalid date') {
              obj.signOutTime = 'Session is Alive';
            }
          });
          console.log(convertedData)
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

  const convertToIndianTime2 = (dateTimeString) => {
    return moment(dateTimeString).tz('Asia/Kolkata').format('hh:mm:ss A');
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="parent-card" style={{ width: '80%' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card" style={{ width: '95%' }}>
            <div className="user-list">
              <p>
                <h3 style={{ color: "blue" }}> Welcome , {userName}</h3>
              </p>
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
                  {currentItems.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.date}</td>
                      <td>{user.singInTime}</td>
                      <td>{user.signOutTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayUserData;
