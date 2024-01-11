import UserTable from "../dashboard/UserTable";
import OrderTable from "./OrderTable";
import ProductTable from "./ProductTable";
// import SideBar from "../Sidebar";
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
              <Link to="" onClick={()=>setSection('Products')} className="">Products</Link>
            </li>
            <li>
              <Link to="" onClick={()=>setSection('Orders')} className="">Orders</Link>
            </li>
            <li>
              <Link to="/login" onClick={handlelogout} className="">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {(section === 'Users' || section === '') && <UserTable />}
      {section === 'Products' && <ProductTable />}
      {section === 'Orders' && <OrderTable />}
    </>
  );
};

export default AdminDashboard;
