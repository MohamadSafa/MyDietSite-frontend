import axios from "axios";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { getUserID } from "../Util/GetUserData";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    setShowModal(true);
  };

  const handleUpdate = async () => {
  const updatedFullName = fullName.trim() !== ""?fullName:selectedUser.fullName
  const updatedEmail = email.trim() !== ""?email:selectedUser.email
  const updatedPhoneNumber = phoneNumber.trim() !== ""?phoneNumber:selectedUser.phoneNumber
  const updatedRole = role.trim() !== ""?role:selectedUser.role
  console.log(updatedFullName)
  console.log(updatedEmail)
  console.log(updatedPhoneNumber)
  console.log(updatedRole)
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const table = await axios.put(
        `http://localhost:5000/users/update/${selectedUser._id}`,
        { fullName:updatedFullName, email: updatedEmail, role: updatedRole, phoneNumber: updatedPhoneNumber },
        // {
        //   headers,
        // }
      );
      fetchUsers();
      setSelectedUser(null);
      setShowModal(false);
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
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
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
                  className="button button-secondary"
                  onClick={() => {
                    handleDelete(user._id);
                  }}
                  disabled={user.id === getUserID()}
                >
                  Delete
                </button>
              </td>
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
                onChange={(e) => setFullName(e.target.value)}
                placeholder={user.fullName}
              />
            </div>
            <div className="form-input">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
              />
              </div>
              <div className="form-input">
              <input
                type="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={user.phoneNumber}
              />
              </div>
              <div className="form-input">
              <input
                type="text"
                onChange={(e) => setRole(e.target.value)}
                placeholder={user.role}
              />
              </div>
              <button className="button button-primary" onClick={handleUpdate}>
                Update
              </button>
          </div>
        </div>
      )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
