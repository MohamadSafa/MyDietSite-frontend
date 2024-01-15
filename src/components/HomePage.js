import React from "react";
import NavBar from "./NavBarHome";
import Herosection from "./Herosection";
import AboutUs from "./about";
import Consultant from "./consultant";
import Nutrition from "./nutrition";
import Strength from "./strength";
import Footerhomepage from "./footer";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Herosection />
      <AboutUs />
      <Consultant />
      <Nutrition />
      <Strength />
      <Footerhomepage />
    </div>
  );
};

export default HomePage;
