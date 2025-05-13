import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosBase from "../axios";

const Support = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("call reached here");
            setIsLoading(true);
            setError("");

            const response = await axiosBase.post("/contact-us/add", data);

            navigate("/");
        } catch (err) {
            setError(
                err?.response?.data?.error || "Something went wrong, Try again"
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="m-[65px] p-6  rounded-2xl">
            <h1 className="text-3xl font-bold mb-4">Support</h1>
            <div className="md:grid grid-cols-1 lg:grid grid-cols-2  items-center ">
                <div className="">
                    <h2 className="text-xl font-semibold mt-4">
                        Office Address
                    </h2>{" "}
                    <p>Desireign </p>
                    <p>S17 , Russia V10 </p>
                    <p>Internation city , Dubai , UAE </p>
                    <h2 className="text-xl font-semibold mt-4">
                        Wear House Address
                    </h2>{" "}
                    <p>Desireign </p>
                    <p>Wearhouse 13 , </p>
                    <p>Opp Astana, Alqous3 , Dubai , UAE </p>
                </div>
                <div>
                    {" "}
                    <h2 className="text-xl font-semibold mt-4">
                        Contact Us
                    </h2>{" "}
                    <form onSubmit={handleSubmit}>
                        {" "}
                        <div className="pt-4">
                            <label className="block  mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border border-gray-700"
                                value={data.name}
                                onChange={handleChange}
                                required
                            />
                        </div>{" "}
                        <div className="pt-4">
                            <label className="block  mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-700"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="pt-4">
                            <label className="block  mb-2">Message *</label>
                            <textarea
                                type="text"
                                name="message"
                                className="w-full p-2 border border-gray-700"
                                value={data.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-customGray text-white w-full font-semibold px-6 py-3 hover:opacity-90"
                            >
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
