import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage";
import MissionPage from "./components/MissionPage";
import LoginForm from "./components/login";
import PlansPage from "./components/PlansPage";
import StoriesPage from './components/StoriesPage';
import AdminDashboard from "./components/dashboard/AdminDashboard"
import { getUserRole } from "./components/Util/GetUserData";
import RequestDashboard from "./components/dashboard/myrequests";

function App() {
  const token = localStorage.getItem('authToken')
  const role = getUserRole()
  console.log(token && role === 'admin')
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/MissionPage" element={<MissionPage />} />
        <Route path="/StoriesPage" element={<StoriesPage />} />
        <Route path="/PlansPage" element={<PlansPage />} />
        {/* <Route path="/PlansPage" element={role === 'user' && <PlansPage />} /> */}
        <Route path="/myrequests/*" element={(role === 'customer') ? <RequestDashboard />: <HomePage/>} />
        <Route path="/admin/*" element={(role === 'admin') ? <AdminDashboard />: <HomePage/>} />
      </Routes>
    </div >
  );
}

export default App;