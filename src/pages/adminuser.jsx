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

  if (loading) return <div>Loading user data...</div>;

  return (
    <div className="admin-users">
      <h1>User Login History</h1>
      <table>
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
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>{user.loginCount}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;