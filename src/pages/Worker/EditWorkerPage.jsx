import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../axios";

const EditWorkerPage = () => {
    const [formData, setFormData] = useState({
        employeeName: "",
        address: "",
        phone: "",
        // jobTitle: "",
        // email: "",
        // location: "",
        // joinDate: "",
        // expDate: "",
        // emergencyName: "",
        // salary: 0,
        // emergencyPhone: "0",
        // userId: "",
        // password: "",
        // bankAccount: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let response = await axiosBase.patch(
                `/workers/update/${id}`,
                { ...formData },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            navigate("/worker");
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    const fetchWorker = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(`/workers/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            const { employeeName, address, phone } = response.data;

            setFormData({
                employeeName,
                address,
                phone,
            });

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWorker();
    }, []);

    return (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="flex justify-start  text-2xl font-bold text-gray-800 text-center w-full">
                        Add New Worker
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    <form onSubmit={handleSubmit}>
                        {" "}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block  mb-2">
                                    Employee Name *
                                </label>
                                <input
                                    type="text"
                                    name="employeeName"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block  mb-2">Address </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.address}
                                    onChange={handleChange}
                                 
                                />
                            </div>

                            <div>
                                <label className="block  mb-2">Phone </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.phone}
                                    onChange={handleChange}
                                  
                                />
                            </div>
                            {/* <div>
                            <label className="block  mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                className="w-full p-2 border border-gray-700"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border border-gray-700"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                className="w-full p-2 border border-gray-700"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Join Date*
                            </label>
                            <input
                                type="date"
                                name="joinDate"
                                className="w-full p-2 border border-gray-700"
                                value={formData.joinDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Expiry Date*
                            </label>
                            <input
                                type="date"
                                name="expDate"
                                className="w-full p-2 border border-gray-700"
                                value={formData.expDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Emergency Contact Person Name *
                            </label>
                            <input
                                type="text"
                                name="emergencyName"
                                className="w-full p-2 border border-gray-700"
                                value={formData.emergencyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Salary *
                            </label>
                            <input
                                type="number"
                                name="salary"
                                className="w-full p-2 border border-gray-700"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Emergency Contact Person Phone *
                            </label>
                            <input
                                type="text"
                                name="emergencyPhone"
                                className="w-full p-2 border border-gray-700"
                                value={formData.emergencyPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                User ID*
                            </label>
                            <input
                                type="text"
                                name="userId"
                                className="w-full p-2 border border-gray-700"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Password *
                            </label>
                            <input
                                type="text"
                                name="password"
                                className="w-full p-2 border border-gray-700"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block  mb-2">
                                Bank Account *
                            </label>
                            <input
                                type="text"
                                name="bankAccount"
                                className="w-full p-2 border border-gray-700"
                                value={formData.bankAccount}
                                onChange={handleChange}
                                required
                            />
                        </div> */}
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

export default EditWorkerPage;
