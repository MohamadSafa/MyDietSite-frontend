import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {getUserID} from "../Util/GetUserData"

const RequestPlanTable2 = () => {
  const [requests, setRequests] = useState();
  const userId = getUserID();
  
 

  const fetchRequests = async () => {
   
  };

  useEffect(() => {
     axios
      .get(`http://localhost:5000/requests/getRequestByUserId/${userId}`)
      .then((response) => {
       // console.log(response.data);
        setRequests(response.data.data);
      })
      .catch((error) => {
        console.error(error)
      });
  }, []);
  
const addPlan = (e)=>{
  e.preventDefault()
}

 console.log(requests)
  return (
    <div className="card-main">
      <h1 className="dashboard-title"> Requests Table </h1>
      {/* {error && <p className="error-message">{error.message}</p>} */}

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
       {requests && <tbody>
          
            <tr key={requests._id}>
              <td>{requests.userId.fullName}</td>
              <td>{requests.height}</td>
              <td>{requests.weight}</td>
              <td>{requests.desiredWeight}</td>
              <td>{requests.planStatus}</td>
            </tr>
        
        </tbody>
}
      </table>
      <table>
      <thead>
          <tr>
            <th colSpan="2">Plan</th>
          </tr>
          <tr>
            <th>Plan Name</th>
          </tr>
          <tr>
            <th>Plan Description</th>
          </tr>
          <tr>
            <th>Meal 1</th>
          </tr>
          <tr>
            <th>Meal 2</th>
          </tr>
          <tr>
            <th>Meal 3</th>
          </tr>
          <tr>
            <th>Meal 4</th>
          </tr>
          <tr>
            <th>Meal 5</th>
          </tr>
        </thead>
       {requests && <tbody>
        
          
          
        
        </tbody>
}
      </table>
      
    </div>
    
  );
};

export default RequestPlanTable2;
