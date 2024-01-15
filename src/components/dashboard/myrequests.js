import RequestPlanTable2 from "./RequestPlanTable2";
import "../styles/NavBar.css";
import Logo from "./Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";



const RequestDashboard = () => {
    const [section, setSection] = useState('')
    const handlelogout = () => {sessionStorage.removeItem('authToken')}
  return (
    <>
      <div className="nav-bar5">
        <div className="Logo4">
           <img src={Logo} alt="logo icon"></img>
        </div>
        <div className="Links5">
          <ul>
          <li>
              <Link to="" onClick={()=>setSection('Requests')} className="">Requests</Link>
            </li>
            <li>
              <Link to="/login" onClick={handlelogout} className="">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
      {(section === 'Requests' || section === '') && <RequestPlanTable2 />}
      <div className="text-center text-5xl flex items-center justify-center gap-8">
                <p className="" style={{ color: "black" }}> Get your </p>
                <p className="mt-10" style={{ color: "#5FD3AA" }}> ideal body </p>
            </div>
    </>
  );
};

export default RequestDashboard;
