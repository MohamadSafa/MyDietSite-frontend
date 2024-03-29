import { Link } from 'react-router-dom';
import React from 'react';
import kettlebell from '../images/strength1.jpeg'
import gear from '../images/strength2.jpeg'
import form from '../images/strength3.jpeg'
import "./styles/nutrition.css"


const Strength = () => {
    return (
        <div className='strength-container'>
            <h2 className="bg-[#CEF3E7] text-center text-5xl pt-20 pb-20 relative" style={{ color: "black" }}>STRENGTH</h2>

            <div id="strength" className="flex pb-20 gap-8 m-10 justify-center">
                <div className="">
                <Link to="https://www.menshealth.com/" target='_blank'><img className="block justify-center items-center rounded-3xl" src={kettlebell} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        KETTLEBELL EXERCISES
                    </p>
                </div>
                <div className="">
                <Link to="https://www.menshealth.com/" target='_blank'><img className="block justify-center items-center rounded-3xl" src={gear} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        YOUR GEAR
                    </p>
                </div>
                <div className="">
                <Link to="https://www.menshealth.com/fitness/" target='_blank'><img className="block justify-center items-center rounded-3xl" src={form} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        PROPER FORM
                    </p>
                </div>
            </div>
            <div className="text-center text-5xl flex items-center justify-center gap-8 flex4">
                <p className="" style={{ color: "black" }}> Get your </p>
                <p className="mt-10" style={{ color: "#5FD3AA" }}> ideal body </p>
            </div>
        </div>
    );
};

export default Strength;