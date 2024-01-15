import "./styles/NavBar.css";
import Logo from "../images/Logo.png";
import Requests from "../images/myrequests.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserRole } from "./Util/GetUserData";

const NavBarHome = () => {
  const navigate = useNavigate();
  const role = getUserRole();
  const token = sessionStorage.getItem('authToken')
  const handlelogout = () => {sessionStorage.removeItem('authToken'); navigate("/login")};
  useEffect(()=>{},[handlelogout])
  const goToRequests = ()=>{
    if(role === "customer"){navigate("/myrequests/*")}
window.location.reload();
}
  return (

    <div className="nav-bar" id="top">
      <div className="Logo">
        <Link to="/">
          <img src={Logo} alt="logo icon"></img>
        </Link>
      </div>
      <div className="Links">
        <ul>
          <li>
            <a href="/#About" className="">About</a>
          </li>
          <li>
            <a href="/MissionPage" className="">Mission</a>
          </li>
          <li>
            <a href="/PlansPage" className="">Plans</a>
          </li>
          <li>
            <a href="/StoriesPage" className="">Stories</a>
          </li>
          <li>
            <a href="#Contact" className="">Contact</a>
          </li>
          <li>
            {token && (
              <button className="Log-out" onClick={handlelogout}>Logout</button>
            )}
          </li>
          <li>
          <Link to="/">
          <img className="my-request" onClick={goToRequests} src={Requests} alt="requests icon"></img>
        </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarHome;
