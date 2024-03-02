// AdminUserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowAttendace from './ShowAtComponent';


const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make a request to fetch all users from the backend
    axios.get('http://localhost:8080/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
  }, []);

  const handleViewReport = (userId) => {
    console.log('View Report clicked for user ID:', userId);
    navigate(`/report/${userId}`); 
  };

  return (
    <div className="admin-user-list">
      <h2>Admin View</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>User Role</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.userName}</td>
              <td>{user.userRole}</td>
              <td>{user.mobNo}</td>
              <td>
                <button onClick={() => handleViewReport(user.id)}>View Report</button>
              
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
