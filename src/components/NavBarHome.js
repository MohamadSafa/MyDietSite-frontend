import "./styles/NavBar.css";
import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBarHome = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken')
  const handlelogout = () => {sessionStorage.removeItem('authToken'); navigate("/login")};
  useEffect(()=>{},[handlelogout])
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
        </ul>
      </div>
    </div>
  );
};

export default NavBarHome;
