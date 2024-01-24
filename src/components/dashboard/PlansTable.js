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
  const [meals, setMeals] = useState([]);
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


  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if(meals.length>0){
      const updatedPlanName = planName.trim() !== ""?planName:selectedPlan.planName
      const updatedPlanDescription = planDescription.trim() !== ""?planDescription:selectedPlan.planDescription
      
      axios.put(
        `${process.env.REACT_APP_URL}/plans/update/${selectedPlan._id}`,
        {planName:updatedPlanName, planDescription: updatedPlanDescription, meals
          
        },
      )
      .then((response) => {
        setError("");
        setShowUpdateModal(false);
        fetchPlans();
      })
      .catch((error)=>{
        console.log(error)
      })
    
    }

  }, [meals]);

  const fetchPlans = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/plans/getAll`)
      .then((response) => {
        console.log(response);
        setPlans(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  };


  const handleDeletePlan = async (planID) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/plans/delete/${planID}`,
      );
      console.log(response);
      fetchPlans();
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdatePlanClickButton = (plan) => {

    setSelectedPlan(plan);
    setShowUpdateModal(true);
  };

  const handleUpdatePlan = async (id) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
      setMeals([
        {
          mealName: mealName1.trim() !== ""?mealName1:selectedPlan.meals[0].mealName,
          mealDescription: mealDescription1.trim() !== ""?mealDescription1:selectedPlan.meals[0].mealDescription,
        },
        {
          mealName: mealName2.trim() !== ""?mealName2:selectedPlan.meals[1].mealName,
          mealDescription: mealDescription2.trim() !== ""?mealDescription2:selectedPlan.meals[1].mealDescription,
        },
        {
          mealName: mealName3.trim() !== ""?mealName3:selectedPlan.meals[2].mealName,
          mealDescription: mealDescription3.trim() !== ""?mealDescription3:selectedPlan.meals[2].mealDescription,
        },
        {
          mealName: mealName4.trim() !== ""?mealName4:selectedPlan.meals[3].mealName,
          mealDescription: mealDescription4.trim() !== ""?mealDescription4:selectedPlan.meals[3].mealDescription,
        },
        {
          mealName: mealName5.trim() !== ""?mealName5:selectedPlan.meals[4].mealName,
          mealDescription: mealDescription5.trim() !== ""?mealDescription5:selectedPlan.meals[4].mealDescription,
        }
      ])
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

      <table className="table">
        <thead>
          <tr>
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
              <td>{plan.planName}</td>
              <td>{plan.planDescription}</td>
              <td>{plan.meals[0]?.mealName}<br/>{(plan.meals[0]?.mealDescription.length > 20) ? (plan.meals[0]?.mealDescription.substring(0, 20)+"...") : (plan.meals[0]?.mealDescription)}</td>
              <td>{plan.meals[1]?.mealName}<br/>{(plan.meals[1]?.mealDescription.length > 20) ? (plan.meals[1]?.mealDescription.substring(0, 20)+"...") : (plan.meals[1]?.mealDescription)}</td>
              <td>{plan.meals[2]?.mealName}<br/>{(plan.meals[2]?.mealDescription.length > 20) ? (plan.meals[2]?.mealDescription.substring(0, 20)+"...") : (plan.meals[2]?.mealDescription)}</td>
              <td>{plan.meals[3]?.mealName}<br/>{(plan.meals[3]?.mealDescription.length > 20) ? (plan.meals[3]?.mealDescription.substring(0, 20)+"...") : (plan.meals[3]?.mealDescription)}</td>
              <td>{plan.meals[4]?.mealName}<br/>{(plan.meals[4]?.mealDescription.length > 20) ? (plan.meals[4]?.mealDescription.substring(0, 20)+"...") : (plan.meals[4]?.mealDescription)}</td>
              {/* <td>{plan.meals[5].mealName}<br/>{(plan.meals[5].mealDescription.length > 20) ? (plan.meals[5].mealDescription.substring(0, 20)) : (plan.meals[5].mealDescription)}</td> */}
              <td>
                <button
                  className="button button-primary"
                  onClick={() => {
                    handleUpdatePlanClickButton(plan);
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
                onChange={(e) => setPlanName(e.target.value)}
                placeholder={plan.planName}
              />
            </div>
            <div className="form-input1">
              <input
                type="text"
                onChange={(e) => setPlanDescription(e.target.value)}
                placeholder={plan.planDescription}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                onChange={(e) => setMealName1(e.target.value)}
                placeholder={plan.meals[0].mealName}
              />
            </div>
            <div className="form-input1">
              <input
                type="text"
                onChange={(e) => setMealDescription1(e.target.value)}
                placeholder={plan.meals[0].mealDescription}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                onChange={(e) => setMealName2(e.target.value)}
                placeholder={plan.meals[1].mealName}
              />
            </div>
            <div className="form-input1">
              <input
                type="text"
                onChange={(e) => setMealDescription2(e.target.value)}
                placeholder={plan.meals[1].mealDescription}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                onChange={(e) => setMealName3(e.target.value)}
                placeholder={plan.meals[2].mealName}
              />
            </div>
            <div className="form-input1">
              <input
                type="text"
                onChange={(e) => setMealDescription3(e.target.value)}
                placeholder={plan.meals[2].mealDescription}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                onChange={(e) => setMealName4(e.target.value)}
                placeholder={plan.meals[3].mealName}
              />
            </div>
            <div className="form-input1">
              <input
                type="text"
                onChange={(e) => setMealDescription4(e.target.value)}
                placeholder={plan.meals[3].mealDescription}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={planDescription}
                onChange={(e) => setMealName5(e.target.value)}
                placeholder={plan.meals[4].mealName}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                onChange={(e) => setMealDescription5(e.target.value)}
                placeholder={plan.meals[4].mealDescription}
              />
            </div>
      
            
            <button
            className="button button-primary"
            onClick={()=>handleUpdatePlan(plan._id)}
            >
              Update Plan
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

export default PlansTable;
