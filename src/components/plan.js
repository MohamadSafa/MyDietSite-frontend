import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUserID } from './Util/GetUserData';
import "./styles/about.css";

const Plan = () => {
const userId = getUserID();
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [desiredWeight, setDesiredWeight] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    axios.post('http://localhost:5000/requests/add', {userId, height, weight, desiredWeight})
    .then((response) => {
      console.log(response.data)
    })
    .catch((error)=>{
      console.error(error)
    })
  };

  return (
    <div>
      <div id='Plan' className="text-center text-5xl pt-10 pb-20 relative" style={{ color: "black" }}> YOUR PLAN
        <div className="block rounded-3xl">
          <p className="text-center text-2xl pt-5 pb-10">Instant plans in the same day</p>
          <div className="block relative">
            <div className="text-2xl px-20 text-left pb-10">
              This page includes a form to fill for: Height, Current Weight, Desired Weight, Gender & Email.
            </div>
            <div className="text-2xl px-20 text-left">
              In this section afterwards, your consultant will calculate the timing and the effort needed (meal plans) to achieve the desired weight then have an e-mail reply within 24 hours.
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-5">Fill here your info.</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* <div className="mb-4">
            <label className="block text-xl font-medium text-gray-600">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-600">Height (cm):</label>
            <input
              type="number"
              name="height"
              onChange={(e)=>setHeight(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-600">Current Weight (kg):</label>
            <input
              type="number"
              name="currentWeight"
              onChange={(e)=>setWeight(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-600">Desired Weight (kg):</label>
            <input
              type="number"
              name="desiredWeight"
              onChange={(e)=>setDesiredWeight(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* <div className="mb-4 col-span-2">
            <label className="block text-xl font-medium text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div> */}

          <div className="col-span-2">
            <button type="submit" className="submit-button2">SUBMIT</button>
          </div>
        </form>
      </div>
      <div className="text-center text-5xl flex items-center justify-center gap-8">
            <p className="" style={{ color: "black" }}> Get your </p>
            <p className="mt-36" style={{ color: "#5FD3AA" }}> ideal body </p>
          </div>
    </div>
  );
};

export default Plan;
