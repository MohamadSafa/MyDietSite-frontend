import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const RequestPlanTable = () => {
  const [requests, setRequests] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState([1,  2 ]);
  const handleButtonClick = () => {
    setInputs([...inputs, inputs.length + 1 , inputs.length + 2 ]);
  };
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [meals, setMeals] = useState([]);
  // const [selectedRequest, setSelectedRequest] = useState(null);
  // const [userId, setUserId] = useState("");
  // const [plans, setPlans] = useState(0);
  // const [height, setHeight] = useState("");
  // const [weight, setWeight] = useState("");
  // const [desiredWeight, setDesiredWeight] = useState("");
  // const [planStatus, setPlanStatus] = useState("");
  // const [error, setError] = useState(null);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showAddModal, setShowAddModal] = useState(false);


  const fetchRequests = async () => {
    await axios
      .get("http://localhost:5000/requests/getAll")
      .then((response) => {
        console.log(response.data);
        setRequests(response.data.data);
        getFullNames(response.data.data);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const getFullNames = async (requests) => {
    try {
      const allNames = requests.map(async (request) => {
        const response = await axios.get(`http://localhost:5000/users/getUserId/${request.userId}`);
        return response.data.data.fullName;
      });

      const names = await Promise.all(allNames);
      setFullNames(names);
    } catch (error) {
      console.error(error);
    }
  };

const addPlan = (e)=>{
  e.preventDefault()
}


  // const fetchPlans = async () => {
  //   axios
  //     .get("http://localhost:5000/plans/getAll")
  //     .then((response) => {
  //       console.log(response);
  //       setProducts(response.data.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // };

  // const handleAddRequest = async () => {
  //   if (!validateInput()) return;

  //   const token = sessionStorage.getItem("authToken");
  //   const headers = { Authorization: `Bearer ${token}` };

  //   try {
  //     await axios.post(
  //       "http://localhost:5000/requests/add",
  //       { height, weight , desiredWeight, planStatus },
  //       { headers }
  //     );

  //     setShowAddModal(false);
  //     fetchRequests();
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // const handelUpdateRequestClickButton = (order) => {
  //   setShowUpdateModal(true);
  //   setSelectedReuqest(request);
  //   setHeight(request.height);
  //   setWeight(request.weight);
  //   setDesiredWeight(request.desiredWeight);
  //   setPlanStatus(request.planStatus);
  // };

  // const handleUpdateRequest = async () => {
  //   if (!validateInput) return;
  //   const token = sessionStorage.getItem("authToken");
  //   const headers = { Authorization: `Bearer ${token}` };

  //   try {
  //     await axios.put(
  //       `http://localhost:5000/requests/update/${selectedRequest.ID}`,
  //       { height, weight, desiredWeight, planStatus },
  //       { headers }
  //     );

  //     setShowUpdateModal(false);
  //     fetchRequests();
  //   } catch (error) {
  //     setError(error);
  //   }
  // };
  // const handleDeleteRequest = async (requestID) => {
  //   const token = sessionStorage.getItem("authToken");
  //   const headers = { Authorization: `Bearer ${token}` };

  //   try {
  //     await axios.delete(
  //       `http://localhost:5000/requests/delete/${requestID}`,
  //       {
  //         headers,
  //       }
  //     );

  //     fetchRequests();
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Requests Table </h1>
      {/* {error && <p className="error-message">{error.message}</p>} */}

      <button
        className="button button-primary"
        // onClick={() => {
        //   setShowAddModal(true);
        // }}
      >
        Add Request
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>desiredWeight</th>
            <th>Plan Status</th>
          </tr>
        </thead>
        <tbody>
          {requests && requests.map((request, index) => (
            <tr key={request._id}>
              <td>{fullNames[index]}</td>
              <td>{request.height}</td>
              <td>{request.weight}</td>
              <td>{request.desiredWeight}</td>
              <td>{request.planStatus}</td>
              <td>
                <button
                  className="button button-primary"
                  onClick={handleOpen}
                >
                  Add Plan
                </button>
                <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box">
          <span
                        onClick={handleClose}
                        className="box-close"
                      >
                        &#x2715;
                      </span>
                      <form className="form-input">
                      <input
                type="text"
                placeholder="Plan Name"
                onChange={(e)=>setPlanName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Plan Description"
                onChange={(e)=>setPlanDescription(e.target.value)}
              />
             {inputs.map((input, index) => (
              index%2==0?
        <input key={index} type="text" placeholder="Meal Name" />
        :<input key={index} type="text" placeholder="Meal Description" />
      ))}
              <div
                  className="button button-secondary"
                  onClick={handleButtonClick}
                >
                  Add Meal
                </div>
                      </form>
          </Box>
        </Modal>
                <button
                  className="button button-secondary"
                  // onClick={() => {
                  //   handleDeleteRequest(request.ID);
                  // }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowAddModal(false);
              }}
            >
              &times;
            </span>
            <h2>Add New Request</h2>
            {error && <p className="error-message">{error.message}</p>}

            <div className="form-input">
              <input
                type="text"
                value={height}
                placeholder="Height"
                onChange={(e) => {
                  height(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={weight}
                placeholder="Weight"
                onChange={(e) => {
                  weight(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <textarea
                value={desiredWeight}
                placeholder="Desired Weight"
                onChange={(e) => {
                  setDesiredWeight(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <textarea
                value={planStatus}
                placeholder="Plan Status"
                onChange={(e) => {
                  setPlanStatus(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <select
                value={plans}
                onChange={(e) => {
                  setPlans(e.target.value);
                }}
              >
                <option value="">Select a Plan</option>
                {plans.map((plan) => (
                  <option key={plan.ID} value={plan.ID}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="button button-primary" onClick={handleAddRequest}>
              Add Request
            </button>
          </div>
        </div>
      )} */}

      {/* {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            >
              &times;
            </span>
            <h2>Update Request</h2>
            {error && <p className="error-message">{error.message}</p>}

            <div className="form-input">
              <input
                type="text"
                value={height}
                placeholder="Total Quantity"
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                value={weight}
                placeholder="Weight"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <textarea
                value={desiredWeight}
                placeholder="Desired Weight"
                onChange={(e) => {
                  setDesiredWeight(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <textarea
                value={planStatus}
                placeholder="Plan Status"
                onChange={(e) => {
                  setPlanStatus(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-input">
              <select
                value={plans}
                onChange={(e) => {
                  setPlans(e.target.value);
                }}
              >
                <option value="">Select a Plan</option>
                {plans.map((plan) => (
                  <option key={plan.ID} value={plan.ID}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="button button-primary"
              onClick={handleUpdateRequest}
            >
              Update Request
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default RequestPlanTable;
