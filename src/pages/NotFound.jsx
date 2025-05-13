// NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-mainBg">
            <div className="text-center text-white">
                <h1 className="text-6xl font-extrabold text-customGray mb-4">
                    404
                </h1>
                <p className="text-lg text-customGray mb-6">
                    Oops! The page you're looking for cannot be found.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
