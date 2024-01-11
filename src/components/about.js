import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/about.css";

const AboutUs = () => {
    return (
        <div className='about-title' id="About">

            {/* <h2 className="about-container" style={{ color: "black" }}> GET STARTED!</h2> */}

            <div className="flex justify-between mb-5">
                <div className="flex center items-center text-4xl px-20 " style={{ color: "black" }}>
                    GET STARTED !
                </div>
                <div className="flex center items-center text-4xl px-20">
                <Link to="/MissionPage">
                    <button className="text-white text-xl px-8 py-3 border-2 border-black rounded-none" style={{ color: "black" }}>
                        Learn more
                    </button>
                    </Link>
                </div>
                <div className="flex center items-center text-4xl px-20">
                <Link to="/login">
                    <button className="text-white text-xl px-8 py-3 border-2 border-black rounded-none" style={{ color: "black" }}>
                        LOGIN
                    </button>
                    </Link>
                </div>
            </div>

        <div className='about-container'>
            <div className="flex justify-between mb-10">
                <div className="flex center items-center text-4xl px-20">
                The Website's brief
                </div>
        </div>
        
        </div>
        <div className='about-container2'>
        <div className="flex center items-center text-2xl px-20">
                Here at My Diet Site, you get FREE access to our programs with the help of professional dietitian online and get your own meal plan. ​All you have to do is to login and press on the [Plans] button in the Navigation Bar above.
                Plans are appointed each 10 Days for each interested visitor via email.
                </div>
                </div>
        </div>
    );
};

export default AboutUs;