import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const RequestPlanTable = () => {
  const [requests, setRequests] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [inputs, setInputs] = useState([1,  2 ]);

  const handleButtonClick = () => {
    // setInputs([...inputs, inputs.length + 1 , inputs.length + 2 ]);
  };

  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [email, setEmail] = useState("");

  const [mealName1, setMealName1] = useState("");
  const [mealDescription1, setMealDescription1] = useState("");
  const [mealName2, setMealName2] = useState("");
  const [mealDescription2, setMealDescription2] = useState("");
  const [mealName3, setMealName3] = useState("");
  const [mealDescription3, setMealDescription3] = useState("");
  const [mealName4, setMealName4] = useState("");
  const [mealDescription4, setMealDescription4] = useState("");
  const [mealName5, setMealName5] = useState("");
  const [mealDescription5, setMealDescription5] = useState("");
  const [meals, setMeals] = useState([]);

  const fetchRequests = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/requests/getAll`)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data.data);
        getFullNames(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getFullNames = async (requests) => {
    try {
      const allNames = requests.map(async (request) => {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/users/getUserId/${request.userId}`
        );
        console.log(response.data)
        setEmail(response.data.data.email)
        return response.data.data.fullName;
      });

      const names = await Promise.all(allNames);
      setFullNames(names);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest = async (id)=>{
    await axios.delete(`${process.env.REACT_APP_URL}/requests/delete/${id}`)
 .then(()=>{
  fetchRequests();
  toast.success("Deleted Successfully!");
 })
 .catch((err)=>toast.error("Error deleting request!"));
  }

  const addPlan = async (id) => {
    setMeals([
      {
        mealName: mealName1,
        mealDescription: mealDescription1,
      },
      {
        mealName: mealName2,
        mealDescription: mealDescription2,
      },
      {
        mealName: mealName3,
        mealDescription: mealDescription3,
      },
      {
        mealName: mealName4,
        mealDescription: mealDescription4,
      },
      {
        mealName: mealName5,
        mealDescription: mealDescription5,
      },
    ]);

    console.log(id);
    try {
      console.log(meals);
      if (meals.length > 0) {
        const response = await axios.post(`${process.env.REACT_APP_URL}/plans/add`, {
          planName,
          planDescription,
          meals,
        });
        console.log(response.data.data._id);
        try {
          const response2 = await axios.put(
            `${process.env.REACT_APP_URL}/requests/updateById/${id}`,
            {
              planStatus: "done",
              planId: response.data.data._id,
            }
          );
  
          console.log(response2.data);
          setOpen(false);
          toast.success("Plan Added Successfully!")
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Requests Table </h1>
      {/* {error && <p className="error-message">{error.message}</p>} */}

      {/* <button
        className="button button-primary"
        // onClick={() => {
        //   setShowAddModal(true);
        // }}
      >
        Add Request
      </button> */}
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>desiredWeight</th>
            <th>Plan Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests &&
            requests.map((request, index) => (
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
                  <button
                          className="button button-primary"
                          onClick={()=>{
                            window.location = `mailto:${email}`
                          }}
                        >
                          Send Email
                        </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className="modal-box">
                      <span onClick={handleClose} className="box-close">
                        &#x2715;
                      </span>
                      <form className="form-input">
                        <input
                          type="text"
                          placeholder="Plan Name"
                          onChange={(e) => setPlanName(e.target.value)}
                        />
                        <input className="form-input1"
                          type="text"
                          placeholder="Plan Description"
                          onChange={(e) => setPlanDescription(e.target.value)}
                        />
                        {/* {inputs.map((input, index) => (
              index%2==0?
        <input key={index} type="text" placeholder="Meal Name" onChange={(e)=> setMealName(e.target.value)} />
        :<input key={index} type="text" placeholder="Meal Description" onChange={(e)=> setMealDescription(e.target.value)}/>
      ))} */}

                        <input
                          key={index}
                          type="text"
                          placeholder="Meal Name 1"
                          onChange={(e) => setMealName1(e.target.value)}
                        />
                        <input className="form-input1"
                          key={index}
                          type="text"
                          placeholder="Meal Description 1"
                          onChange={(e) => setMealDescription1(e.target.value)}
                        />
                        <input
                          key={index}
                          type="text"
                          placeholder="Snack Name 1"
                          onChange={(e) => setMealName2(e.target.value)}
                        />
                        <input className="form-input1"
                          key={index}
                          type="text"
                          placeholder="Snack Description 1"
                          onChange={(e) => setMealDescription2(e.target.value)}
                        />
                        <input
                          key={index}
                          type="text"
                          placeholder="Meal Name 2"
                          onChange={(e) => setMealName3(e.target.value)}
                        />
                        <input
                          key={index} className="form-input1"
                          type="text"
                          placeholder="Meal Description 2"
                          onChange={(e) => setMealDescription3(e.target.value)}
                        />
                        <input
                          key={index}
                          type="text"
                          placeholder="Snack Name 2"
                          onChange={(e) => setMealName4(e.target.value)}
                        />
                        <input className="form-input1"
                          key={index}
                          type="text"
                          placeholder="Snack Description 2"
                          onChange={(e) => setMealDescription4(e.target.value)}
                        />

                        <input
                          key={index}
                          type="text"
                          placeholder="Meal Name 3"
                          onChange={(e) => setMealName5(e.target.value)}
                        />
                        <input className="form-input1"
                          key={index}
                          type="text"
                          placeholder="Meal Description 3"
                          onChange={(e) => setMealDescription5(e.target.value)}
                        />
                        <div
                          className="button1 button-secondary1"
                          onClick={() => addPlan(request._id)}
                        >
                          SUBMIT PLAN
                        </div>
                        
                      </form>
                    </Box>
                  </Modal>
                  <button
                    className="button button-secondary"
                    onClick={() => {
                      handleDeleteRequest(request._id);
                    }}
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
