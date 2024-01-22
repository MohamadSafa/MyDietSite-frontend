import { Link } from 'react-router-dom';
import React from 'react';
import smoothie from '../images/nutrition1.jpeg'
import oatmeal from '../images/nutrition2.jpeg'
import fruits from '../images/nutrition3.jpeg'
import "./styles/nutrition.css"


const Nutrition = () => {
    return (
        <div>
            <h2 className="bg-[#CEF3E7] text-center text-5xl pt-20 pb-20 relative" style={{ color: "black" }}>NUTRITION</h2>

            <div id="nutrition" className="flex pb-20 gap-8 m-10 justify-center">
                <div className="">
                    <Link to="https://www.delish.com/cooking/g1457/healthy-smoothie-recipes/" target='_blank'><img className="block justify-center items-center rounded-3xl" src={smoothie} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        SMOOTHIE RECIPE
                    </p>
                </div>
                <div className="">
                <Link to="https://loseweightbyeating.com/healthy-oatmeal-recipes-breakfast-weight-loss/" target='_blank'><img className="block justify-center items-center rounded-3xl" src={oatmeal} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        NUTRITIOUS BREAKFAST
                    </p>
                </div>
                <div className="">
                <Link to="https://www.healthline.com/health/balanced-diet" target='_blank'><img className="block justify-center items-center rounded-3xl" src={fruits} alt="" /></Link>
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        BALANCE YOUR DIET
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;