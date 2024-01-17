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
        </div>
      </div>
    </div>
  );
}
export default Herosection2;
