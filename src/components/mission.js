import React from 'react';
import { Link } from 'react-router-dom';
import athletes from '../images/athletes.png';
import "./styles/about.css";

const Mission = () => {
    return (
        <div className='mission-container'>
        <div id='mission' className="text-center text-5xl pt-10 pb-20 relative" style={{ color: "black" }}> OUR MISSION
            <div className="block justify-center items-center rounded-3xl">
                <div className="block relative">
                    <div className="text-center text-2xl px-40 pt-20 flex5">
                    <p className="text-center text-2xl flex-end"/>
                    Our mission is to deliver and assist the clients with the ideal meal plans from our nutritionists’ advisors that are suitable with their lifestyles, jobs, occupations in order to keep them in shape, fit, and appear as a role model for others. And in case you take our mealpackages, you’re guaranteed to have the best foodquality all organic. We as diet online based business urge you to become a member of our family, and keep in mind that the secret behind a perfect shape is 70% food, and 30% Physical education, so we provide the greatest majority.
                    <p/>
                </div>
                <img className="block justify-center items-center rounded-3xl" src={athletes} alt="" />
                </div> 
            </div>
            <div className="text-center text-5xl flex items-center justify-center gap-8 flex4">
                <p className="" style={{ color: "black" }}> Get your </p>
                <p className="mt-10" style={{ color: "#5FD3AA" }}> ideal body </p>
            </div>
        </div>
        </div>
    );
};

export default Mission;