import React from 'react';
import smoothie from '../images/nutrition1.jpeg'
import oatmeal from '../images/nutrition2.jpeg'
import fruits from '../images/nutrition3.jpeg'


const Nutrition = () => {
    return (
        <div>
            <h2 className="bg-[#CEF3E7] text-center text-5xl pt-20 pb-20 relative" style={{ color: "black" }}>NUTRITION</h2>

            <div id="nutrition" className="flex pb-20 gap-8 m-10 justify-center">
                <div className="">
                    <img className="block justify-center items-center rounded-3xl" src={smoothie} alt="" />
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        SMOOTHIE RECIPE
                    </p>
                </div>
                <div className="">
                    <img className="block justify-center items-center rounded-3xl" src={oatmeal} alt="" />
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        NUTRITIOUS BREAKFAST
                    </p>
                </div>
                <div className="">
                    <img className="block justify-center items-center rounded-3xl" src={fruits} alt="" />
                    <p className="text-white text-xl text-center pt-10" style={{ color: "black" }}>
                        BALANCE YOUR DIET
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;