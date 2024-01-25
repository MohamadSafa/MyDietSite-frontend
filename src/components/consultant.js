import React from 'react';
import { Link } from 'react-router-dom';
import coach from '../images/coach.png';
import "./styles/consultant.css";


const Consultant = () => {
    return (
        <div id='consultant' className="text-center text-5xl pt-20 pb-10 relative" style={{ color: "black" }}> YOUR HEALTHY CONSULTANT
        <p className="text-center2 text-2xl pt-5 pb-20">Mohamad, 27 years, Your Diet & Gym Consultant</p>
            <div id='consultant2' className="block justify-center items-center rounded-3xl">
                <div className="flex relative consultant-flex">
                    <img className="block justify-center items-center rounded-3xl" src={coach} alt="mohamad-safa" />
                    <div className="text-center text-xl flex3">
                    <p className="text-center text-xl flex-end flex3"/>
                    In order to get fit, have the proper diet, the ideal body you always dreamed of and re-feel the lost comfort, you should start with most importantly your eating lifestyle. Healthy food constitute 70% of most ideal bodies, and 30% rely on exercise. So I'm telling you everything starts with your lifestyle, what you eat as in quality and quantity.
                    <p/>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Consultant;