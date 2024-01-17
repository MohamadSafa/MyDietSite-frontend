import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image3 from "../images/hero3.png";
import "./styles/Herosection.css";

function Herosection3({ img }) {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  return (
    <div>
      <div className="Header-Desktop">
        <div>
          <img src={Image3} className="size-16 md:h-full w-full" alt="hero image"></img>
        </div>
      </div>
    </div>
  );
}
export default Herosection3;
