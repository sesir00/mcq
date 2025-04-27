import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Correct import
import './AllUserData.css';
import Header from './Dheader';
import Sidebar from './Dslider';

function AllUserData() {
  const [users, setUsers] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const OpenSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

  useEffect(() => fetchUsers(), []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/users/change-user')
      .then((response) => setUsers(response.data))
      .catch(() => Swal.fire("Error", "Failed to fetch users data.", "error")); // Correct usage of Swal
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditedUserData({ ...user });
  };

  const handleEditChange = (e, key) => {
    setEditedUserData({ ...editedUserData, [key]: e.target.value });
  };

  const handleEditSubmit = () => {
    axios
      .put('http://localhost:3000/users/update-user', editedUserData)
      .then((response) => {
        Swal.fire("Success", response.data.message, "success"); // Correct usage of Swal
        setEditingUser(null);
        fetchUsers();
      })
      .catch(() => Swal.fire("Error", "Failed to update user.", "error")); // Correct usage of Swal
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true, // Fixed the button property for showing cancel button
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) { // Correct usage of result.isConfirmed
        axios
          .delete(`http://localhost:3000/users/delete-user/${id}`)
          .then((response) => {
            Swal.fire("Deleted!", response.data.message, "success"); // Correct usage of Swal
            fetchUsers();
          })
          .catch(() => Swal.fire("Error", "Failed to delete user.", "error")); // Correct usage of Swal
      }
    });
  };

  return (
    <div className="grid-container">
  <Header OpenSidebar={OpenSidebar} className="header-container" />
  <Sidebar openSidebarToggle={openSidebarToggle} className="sidebar-container" />
  <div className="content">
    <h1>All User Data</h1>
    {users.length > 0 ? (
      <table className="user-table">
        <thead>
          <tr>
            {Object.keys(users[0])
              .filter((column) => column !== 'password')
              .map((column) => <th key={column}>{column}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {Object.entries(user)
                .filter(([key]) => key !== 'password')
                .map(([key, value]) => (
                  <td key={key}>
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        className="user-input"
                        value={editedUserData[key]}
                        onChange={(e) => handleEditChange(e, key)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                ))}
              <td>
                {editingUser === user.id ? (
                  <button className="action-button" onClick={handleEditSubmit}>
                    Save
                  </button>
                ) : (
                  <button className="action-button" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                )}
                <button className="action-button" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No user data available.</p>
    )}
  </div>
</div>

  );
}

export default AllUserData;
