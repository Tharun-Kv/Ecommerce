import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase-config';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(db, 'users');
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([id, user]) => ({
          id,
          name: user.displayName || user.username || 'Unknown',
          email: user.email || 'No email',
          lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never',
          loginCount: user.loginCount || 0,
          isAdmin: user.isAdmin || false
        }));
        setUsers(usersList);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading user data...</p>
    </div>
  );

  return (
    <div className="admin-users-container">
      <h1 className="admin-title">User Login History</h1>
      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Login Count</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className={user.isAdmin ? 'admin-row' : ''}>
                <td data-label="User">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Last Login">{user.lastLogin}</td>
                <td data-label="Login Count">{user.loginCount}</td>
                <td data-label="Type">
                  <span className={`user-type ${user.isAdmin ? 'admin-badge' : 'user-badge'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

// CSS Styles
const styles = `
  .admin-users-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .admin-title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 2rem;
  }

  .table-responsive {
    overflow-x: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: white;
  }

  .users-table {
    width: 100%;
    border-collapse: collapse;
    color: #333;
  }

  .users-table th {
    background-color: #3498db;
    color: white;
    padding: 1rem;
    text-align: left;
    font-weight: 500;
  }

  .users-table td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .users-table tr:last-child td {
    border-bottom: none;
  }

  .users-table tr:hover {
    background-color: #f5f5f5;
  }

  .admin-row {
    background-color: #f8f9fa;
  }

  .user-type {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .admin-badge {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  .user-badge {
    background-color: #e8f5e9;
    color: #388e3c;
  }

  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #3498db;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .users-table {
      display: block;
    }

    .users-table thead {
      display: none;
    }

    .users-table tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    .users-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .users-table td:before {
      content: attr(data-label);
      font-weight: 600;
      color: #555;
      margin-right: 1rem;
    }

    .users-table td:last-child {
      border-bottom: none;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);