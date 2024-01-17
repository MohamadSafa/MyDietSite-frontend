import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../images/hero1.png";
import "./styles/Herosection.css";

function Herosection({ img }) {

  return (
    <div>
      <div className="Header-Desktop">
        <div>
          <img src={Image} className="size-16 md:h-full w-full" alt="hero image"></img>
          <Link to="/MissionPage" >
            <button className="Learn-more"> Learn more </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Herosection;
