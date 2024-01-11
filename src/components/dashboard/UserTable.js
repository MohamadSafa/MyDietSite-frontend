import axios from "axios";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { getUserID } from "../Util/GetUserData";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [role, setRole] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [address, setAddress] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("Full Name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    try {
      await axios.post(
        "http://localhost:5000/users/register",
        formData,
        {
          headers,
        }
      );

      fetchUsers();
      // setShowAddModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/users/getAll")
      .then((response) => {
        console.log(response);
        setUsers(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleUpdateClickButton = (user) => {
    setSelectedUser(user);
    setFullName(user.fullName);
    setEmail(user.email);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.put(
        `http://localhost:5000/users/update/${selectedUser.ID}`,
        { fullName, email },
        {
          headers,
        }
      );
      fetchUsers();
      setSelectedUser(null);
      setShowModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleSwitchToAdmin = async (userID) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(
        `http://localhost:5000/users/switchToAdmin/${userID}`,
        {},
        {
          headers,
        }
      );
      fetchUsers();
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async (userid) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    console.log(headers);
    try {
      await axios.delete(
        `http://localhost:5000/users/delete/${userid}`,
        {
          headers,
        }
      );
      fetchUsers();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> User Table </h1>
      {error && <p className="error-message">{error.message}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="button button-primary"
                  onClick={() => {
                    handleUpdateClickButton(user);
                  }}
                >
                  Update
                </button>
                <button
                  className="button secondary-button"
                  onClick={() => {
                    handleSwitchToAdmin(user._id);
                  }}
                  disabled={user.role === "admin"}
                >
                  Switch to Admin
                </button>
                <button
                  className="button delete-button"
                  onClick={() => {
                    handleDelete(user._id);
                  }}
                  disabled={user.id === getUserID()}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </span>
            <h2>Update User</h2>
            <div className="form-input">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div className="form-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button className="button button-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
