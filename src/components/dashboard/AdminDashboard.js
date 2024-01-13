import UserTable from "../dashboard/UserTable";
import RequestPlanTable from "./RequestPlanTable";
import PlansTable from "./PlansTable";
import "../styles/NavBar.css";
import Logo from "./logo2.png";
import { Link } from "react-router-dom";
import { useState } from "react";


const AdminDashboard = () => {
    const [section, setSection] = useState('')
    const handlelogout = () => {sessionStorage.removeItem('authToken')}
  return (
    <>
      <div className="nav-bar4">
        <div className="Logo4">
           <img src={Logo} alt="logo icon"></img>
        </div>
        <div className="Links4">
          <ul>
            <li>
              <Link to="" onClick={()=>setSection('Users')} className="">Users</Link>
            </li>
            <li>
              <Link to="" onClick={()=>setSection('Plans')} className="">Plans</Link>
            </li>
            <li>
              <Link to="" onClick={()=>setSection('Requests')} className="">Requests</Link>
            </li>
            <li>
              <Link to="/login" onClick={handlelogout} className="">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {(section === 'Users' || section === '') && <UserTable />}
      {section === 'Plans' && <PlansTable />}
      {section === 'Requests' && <RequestPlanTable />}
    </>
  );
};

export default AdminDashboard;
