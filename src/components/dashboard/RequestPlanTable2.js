import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getUserID } from "../Util/GetUserData";

const RequestPlanTable2 = () => {
  const [requests, setRequests] = useState();
  const userId = getUserID();

  const fetchRequests = async () => {};

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/requests/getRequestByUserId/${userId}`)
      .then((response) => {
        // console.log(response.data);
        setRequests(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(requests);
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
        {requests && (
          <tbody>
            <tr key={requests._id}>
              <td>{requests.userId.fullName}</td>
              <td>{requests.height}</td>
              <td>{requests.weight}</td>
              <td>{requests.desiredWeight}</td>
              <td>{requests.planStatus}</td>
            </tr>
          </tbody>
        )}
      </table><br/><br/>
      {
        requests && requests.planId &&
        <>
        <h1 className="dashboard-title"> Your Plan </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Plan Description</th>
            <th>Meal 1</th>
            <th>Meal 2</th>
            <th>Meal 3</th>
            <th>Meal 4</th>
            <th>Meal 5</th>
          </tr>
        </thead>
        {requests && requests.planId && (
          <tbody>
            <tr key={requests._id}>
              <td>{requests.planId.planName}</td>
              <td>{requests.planId.planDescription}</td>
              <td>{requests.planId.meals[0].mealName}<br/>{requests.planId.meals[0].mealDescription}</td>
              <td>{requests.planId.meals[1].mealName}<br/>{requests.planId.meals[1].mealDescription}</td>
              <td>{requests.planId.meals[2].mealName}<br/>{requests.planId.meals[2].mealDescription}</td>
              <td>{requests.planId.meals[3].mealName}<br/>{requests.planId.meals[3].mealDescription}</td>
              <td>{requests.planId.meals[4].mealName}<br/>{requests.planId.meals[4].mealDescription}</td>
            </tr>
          </tbody>
        )}
      </table>
      </>
      }
      
    </div>
  );
};

export default RequestPlanTable2;
