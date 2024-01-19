import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
const PlansTable = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [meals, setMeals] = useState("");


  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    axios
      .get("http://localhost:5000/plans/getAll")
      .then((response) => {
        console.log(response);
        setPlans(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };


  const handleDeletePlan = async (planID) => {
    // const token = sessionStorage.getItem("authToken");
    // const headers = { Authorization: `Bearer ${token}` };
    // try {
    //   const response = await axios.delete(
    //     `http://localhost:5000/plans/delete/${planID}`,
    //     {
    //       headers,
    //     }
    //   );
    //   console.log(response);
    //   fetchPlans();
    // } catch (error) {
    //   setError(error);
    // }
  };

  const handleAddPlan = async () => {
    // const token = sessionStorage.getItem("authToken");
    // const headers = { Authorization: `Bearer ${token}` };

    // const formData = new FormData();
    // formData.append("planName", planName);
    // formData.append("planDescription", planDescription);
    // formData.append("Meals", meals);

    // try {
    //   await axios.post(
    //     "http://localhost:5000/plans/add",
    //     formData,
    //     {
    //       headers,
    //     }
    //   );

    //   fetchPlans();
    //   setShowAddModal(false);
    // } catch (error) {
    //   setError(error);
    // }
  };

  const handleUpdatePlanClickButton = (e,plan) => {
//     e.preventDefault();
//     setSelectedProduct(plan);
//     setProducts(plan.plans);
//     setPlanName(plan.planName);
//     setPlanDescription(plan.planDescription);
//     setMeals(plan.meals);
//     setShowUpdateModal(true);
//   };
//   console.log('selectedPlan', selectedPlan)
//   const handleUpdatePlan = async (e, selectedPlan) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("authToken");
//     const headers = { Authorization: `Bearer ${token}` };

//     const formData = new FormData();
//     formData.append("planName", planName);
//     formData.append("planDescription", planDescription);
//     formData.append("meals", meals);
 
//     try {
//       console.log(planName, planDescription, meals);
//       await axios.put(
//         `http://localhost:5000/plans/update/${selectedPlan._id}`,
//         {formData
          
//         },
//         {
//           headers,
//         }
//       );

//       fetchPlans();
//       setError("");
//       setShowUpdateModal(false);
//     } catch (error) {
//       setError(error);
//     }
  };

  const [sortRequests, setSortRequests] = useState(true); // true for ascending order , false for descending
  const toggleSort = (field) => {
    // const newSortedPlans = [...plans].sort((a, b) => {
    //   // if(a[field]< b[field]) return -1 aw 1 if i want sortOrder true aw false

    //   if (a[field] < b[field]) return sortOrder ? -1 : 1;

    //   if (a[field] > b[field]) return sortOrder ? 1 : -1;

    //   return 0;
    // });

    // setPlans(newSortedPlans);
    // setSortRequests(!sortRequests);
  };

  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Plans Table </h1>

      {error && <p className="error-message">{error.message}</p>}

      <button
        className="button button-primary"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        Add plan
      </button>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("ID")}>ID</th>
            <th onClick={() => toggleSort("name")}>Plan Name</th>
            <th onClick={() => toggleSort("description")}>Plan Description</th>
            <th onClick={() => toggleSort("meals")}>Meal 1</th>
            <th onClick={() => toggleSort("meals")}>Meal 2</th>
            <th onClick={() => toggleSort("meals")}>Meal 3</th>
            <th onClick={() => toggleSort("meals")}>Meal 4</th>
            <th onClick={() => toggleSort("meals")}>Meal 5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans && plans.map((plan) => (
            <tr className="venue-table" key={plan._id}>
              <td>{plan._id}</td>
              <td>{plan.planName}</td>
              <td>{plan.planDescription}</td>
              <td>{plan.meals[0].mealName}<br/>{(plan.meals[0].mealDescription.length > 20) ? (plan.meals[0].mealDescription.substring(0, 20)+"...") : (plan.meals[0].mealDescription)}</td>
              <td>{plan.meals[1].mealName}<br/>{(plan.meals[1].mealDescription.length > 20) ? (plan.meals[1].mealDescription.substring(0, 20)+"...") : (plan.meals[1].mealDescription)}</td>
              <td>{plan.meals[2].mealName}<br/>{(plan.meals[2].mealDescription.length > 20) ? (plan.meals[2].mealDescription.substring(0, 20)+"...") : (plan.meals[2].mealDescription)}</td>
              <td>{plan.meals[3].mealName}<br/>{(plan.meals[3].mealDescription.length > 20) ? (plan.meals[3].mealDescription.substring(0, 20)+"...") : (plan.meals[3].mealDescription)}</td>
              <td>{plan.meals[4].mealName}<br/>{(plan.meals[4].mealDescription.length > 20) ? (plan.meals[4].mealDescription.substring(0, 20)+"...") : (plan.meals[4].mealDescription)}</td>
              {/* <td>{plan.meals[5].mealName}<br/>{(plan.meals[5].mealDescription.length > 20) ? (plan.meals[5].mealDescription.substring(0, 20)) : (plan.meals[5].mealDescription)}</td> */}
              <td>
                <button
                  className="button button-primary"
                  onClick={(e) => {
                    handleUpdatePlanClickButton(e,plan);
                  }}
                >
                  Update
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    handleDeletePlan(plan._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Venue Modal */}
      {showAddModal && (
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
            <h2>Add Plan</h2>
            <div className="form-input">
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Plan Name"
              />
            </div>
            <div className="form-input">
              <textarea
                value={planDescription}
               // onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Plan Description"
              />
            </div>
            <div className="form-input">
              <textarea
                value={meals}
              //  onChange={(e) => setCategory(e.target.value)}
                placeholder="Meals"
              />
            </div>

            <button
              className="button button-primary"
              onClick={handleAddPlan}
            >
              Add Plan
            </button>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
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
            <h2>Update Plan</h2>
            <div className="form-input">
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Plan Name"
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={planDescription}
                onChange={(e) => setPlanDescription(e.target.value)}
                placeholder="Plan Description"
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={meals}
              //  onChange={(e) => setStock(e.target.value)}
                placeholder="Meals"
              />
            </div>
            
            <button
              className="button button-primary"
             // onClick={(e)=>handleUpdatePlan(e,selectedPlan)}
            >
              Update Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansTable;
