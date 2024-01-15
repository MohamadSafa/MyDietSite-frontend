import React from 'react';
import { Link } from 'react-router-dom';
import transform from '../images/transformation.jpg';
import transform2 from '../images/transformation2.png';
import "./styles/consultant.css";


const Stories = () => {
    return (
        <div id='consultant2' className="text-center text-5xl pt-20 pb-40 relative" style={{ color: "black" }}> Our Success
            <div className="block justify-center items-center rounded-3xl">
                <div className="flex relative consultant-flex2">
                    <img className="block justify-center items-center rounded-3xl pt-20 mb-10" src={transform} alt="mohamad-safa2" />
                    <div className="text-center text-3xl flex pt-20">
                    <p className="text-center text-xl flex-end"/>
                    Mohamad, lost 42 Kgs, 27 years
                    <p/>
                </div>
                </div>
                <div className="flex relative consultant-flex2">
                <div className="text-center text-3xl flex pt-20">
                    <p className="text-center text-xl flex-end"/>
                    Elie & Rania, lost 37 Kgs: “I love getting compliments on how I look” Rania says. Elie agrees, “people notice our weight loss”.
                    <p/>
                </div>
                    <img className="block justify-center items-center rounded-3xl pt-20" src={transform2} alt="mohamad-safa2" />
                </div>
                <div className="text-center text-5xl flex items-center justify-center gap-8 mt-10">
                <p className="" style={{ color: "black" }}> Get your </p>
                <p className="mt-10" style={{ color: "#5FD3AA" }}> ideal body </p>
            </div>
            </div>
            
        </div>
        
    );
};

export default Stories;