import React from "react";
import NavBar from "./NavBarHome";
import Herosection4 from "./herosection4";
import Footerhomepage from "./footerhomepage";
import Stories from "./stories";

const StoriesPage = () => {
    return (
      <div>
        <NavBar />
        <Herosection4 />
        <Stories/>
        <Footerhomepage />
      </div>
    );
  };
  
  export default StoriesPage;
