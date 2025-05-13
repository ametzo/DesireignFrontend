import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axios";
import SelectDropdown from "../../components/SelectDropDown";

function AddServicePage() {
    const [formData, setFormData] = useState({
        customerId: "",
        project: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchCustomersList = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(`/customers/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setCustomers(response?.data);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCustomersList();
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let response = await axiosBase.post(
                "/services/add",
                { ...formData },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            navigate("/service");
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center  p-4 ">
                    <h2 className="flex justify-start text-2xl font-bold text-gray-800 text-center w-full">
                        Add New Service
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block  mb-2">
                                    Customer *
                                </label>

                                <SelectDropdown
                                    data={customers}
                                    valueName={"_id"}
                                    displayName={"company"}
                                    placeholder="Select "
                                    selectedData={formData.customerId || ""}
                                    setSelectedData={(val) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                ["customerId"]: val,
                                            };
                                        });
                                    }}
                                    // disabled={!isEditPermission}
                                />
                            </div>{" "}
                            <div>
                                <label className="block  mb-2">Project *</label>
                                <input
                                    type="text"
                                    name="project"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.project}
                                    onChange={handleChange}
                                    required
                                />
                            </div>{" "}
                            <div>
                                <label className="block  mb-2">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block  mb-2">
                                    End Date *
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>{" "}
                        <div className="pt-4">
                            <label className="block  mb-2">Description *</label>
                            <textarea
                                type="text"
                                name="description"
                                className="w-full p-2 border border-gray-700"
                                value={formData.description}
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
}

export default AddServicePage;
