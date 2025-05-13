import React from "react";
import { Link } from "react-router-dom";

const Card = ({ icon: Icon, title, link }) => {
    return (
        <Link to={link} className="w-full  md:w-1/2 lg:w-1/4 p-2">
            <div className="bg-white p-4 flex flex-col items-center cursor-pointer transform hover:opacity-90 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                    <p className="text-4xl text-white">
                        <Icon className="w-[39px] h-[39px] text-black" />
                    </p>
                </div>
                <h3 className="text-xl  text-CustomGray text-center">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card;
