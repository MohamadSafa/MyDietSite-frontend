import RequestPlanTable2 from "./RequestPlanTable2";
import "../styles/NavBar.css";
import Logo from "./Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import {getUserID} from "../Util/GetUserData"


const RequestDashboard = () => {
    const [section, setSection] = useState('')
    const handlelogout = () => {sessionStorage.removeItem('authToken')}
    const userId = getUserID();
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
      
    </>
  );
};

export default RequestDashboard;
