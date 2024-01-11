import "./styles/NavBar.css";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NavBarHome = () => {
  const token = sessionStorage.getItem('authToken')
  const handlelogout = () => {sessionStorage.removeItem('authToken'); window.location.reload()};
  useEffect(()=>{},[handlelogout])
  return (

    <div className="nav-bar">
      <div className="Logo">
        <Link to="/">
          <img src={Logo} alt="logo icon"></img>
        </Link>
      </div>
      <div className="Links">
        <ul>
          <li>
            <a href="#About" className="">About</a>
          </li>
          <li>
            <a href="#Mission" className="">Mission</a>
          </li>
          <li>
            <a href="#Plans" className="">Plans</a>
          </li>
          <li>
            <a href="#Stories" className="">Stories</a>
          </li>
          <li>
            <a href="#Contact" className="">Contact</a>
          </li>
          {/* <li>
            <img src={Vector} className="search-icon" alt="search icon"></img>
          </li> */}
          {/* <li>
            <Link to='/CartPage'>
              <img src={CartImage} className="cart-icon" alt="cart-icon"></img>
            </Link>
          </li> */}
        </ul>
      </div>
      {/* <div className="Login">
        {token? 
        <Link to='/' className="login-btn" onClick={handlelogout}>Log out</Link>
        :
        <Link to='/login' className="login-btn">Log in</Link>
      }
        </div> */}
    </div>
  );
};

export default NavBarHome;
