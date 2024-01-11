import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image2 from "../images/hero2.png";
import "./styles/Herosection.css";

function Herosection2({ img }) {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  return (
    <div>
      <div className="Header-Desktop">
        <div>
          <img src={Image2} className="size-16 md:h-full w-full" alt="hero image"></img>
          {/* <Link to="/MissionPage">
            <button className="Order-now"> Learn more </button>
          </Link> */}
        </div>
        <div>
          
        </div>
       
      

      </div>


      {/* <div className="Hero-Mobile">
        <div className="Mobile">
          <div className="Mobile-Navbar">
            <button className="Mobile-Burger" onClick={toggleBurgerMenu}>
            </button>

            <div class="space-y-2">
              <div class="w-8 h-0.5 bg-gray-600"></div>
              <div class="w-8 h-0.5 bg-gray-600"></div>
              <div class="w-8 h-0.5 bg-gray-600"></div>
            </div>

            <div className={`Mobile-Nav ${isBurgerActive ? "active" : ""}`}>
              <a className="Mobile-Nav-Title" href="/About">
                About
              </a>
              <a className="Mobile-Nav-Title" href="/Products">
                Products
              </a>
              <a className="Mobile-Nav-Title" href="/Services">
                Services
              </a>
              <a className="Mobile-Nav-Title" href="/Contact us">
                Contact us
              </a>
            </div>
            <div className="Mobile-Logo">Paw-sitive</div>
            <button className="Mobile-Login">Log in</button>
          </div>

          <div className="Mobile-Header-Hero">
            <div className="Mobile-Hero-description">
              <p className="Mobile-Hero-description1">
                <span className="Mobile-Header-highlight">Pawsitive</span> Pet
                Shop
              </p>
              <p className="Mobile-Hero-description2">
                Your Pet, Our Priority <br /> <br />
                Order Now!
              </p>
              <button className="Mobile-Header-order">Order now!</button>
            </div>
          </div> 
        </div>
      </div>*/}
    </div>
  );
}
export default Herosection2;
