import "./styles/NavBar.css";
import Logo from "../images/Logo.png";
import Burger from "../images/burger-menu.png"
import Requests from "../images/myrequests.png"
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "./Util/GetUserData";

const NavBarHome = () => {
  const navigate = useNavigate();
  const role = getUserRole();
  const token = sessionStorage.getItem('authToken')
  const handlelogout = () => {sessionStorage.removeItem('authToken'); toast.success("Logged out Successfully!"); navigate("/login")};
  useEffect(()=>{},[handlelogout])
  const goToRequests = ()=>{
    if(role === "admin"){navigate("/admin/*")
  } else if (role === "customer"){navigate("/myrequests/*")}
window.location.reload();

}
const [isBurgerActive, setIsBurgerActive] = useState(false);
const toggleBurgerMenu = () => {
  setIsBurgerActive(!isBurgerActive);
};
  return (
<div>
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
          {role !== null && <Link to="/">
          <img className="my-request" onClick={goToRequests} src={Requests} alt="requests icon"></img>
        </Link>}
          </li>
        </ul>
      </div>
      </div>
       <div className="Hero-Mobile">
        <div className="Mobile">
        <div className="Mobile-Logo">
            <Link to="/">
          <img src={Logo} alt="logo icon"/>
            </Link>
            </div>
            {role !== null && <Link to="/">
          <img className="my-request" onClick={goToRequests} src={Requests} alt="requests icon"></img>
        </Link>}
          <div className="Mobile-Navbar">
            <div className="burger-icon">
        <Link to="/">
          <img src={Burger} alt="burger icon" onClick={toggleBurgerMenu}/>
        </Link>
            </div>
            {isBurgerActive && <div className={`Mobile-Nav ${isBurgerActive ? "active" : ""}`}>
              <a className="Mobile-Nav-Title" href="/#About">
                About
              </a>
              <a className="Mobile-Nav-Title" href="/MissionPage">
                Mission
              </a>
              <a className="Mobile-Nav-Title" href="/PlansPage">
                Plans
              </a>
              <a className="Mobile-Nav-Title" href="/StoriesPage">
                Stories
              </a>
              <a className="Mobile-Nav-Title" href="#Contact">
                Contact
              </a>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarHome;
