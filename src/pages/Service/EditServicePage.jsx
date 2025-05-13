import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../axios";
import { PageLoader } from "../../components";
import SelectDropdown from "../../components/SelectDropDown";
const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

function EditServicePage() {
    const [formData, setFormData] = useState({
        customerId: "",
        project: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchCustomersList = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/customers/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setCustomers(response?.data);

            setIsPageLoading(false);
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

            let response = await axiosBase.patch(
                `/services/update/${id}`,
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

    const fetchService = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/services/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            const {
                customerId,
                project,

                startDate,
                endDate,
                description,
            } = response.data.service;

            setFormData({
                customerId: customerId?._id,
                project,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                description,
            });

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);

    return (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center  p-4 ">
                    <h2 className="flex justify-start text-2xl font-bold text-gray-800 text-center w-full">
                        Edit Service
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                {isPageLoading ? (
                    <PageLoader />
                ) : (
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
                                    <label className="block  mb-2">
                                        Project *
                                    </label>
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
                                <label className="block  mb-2">
                                    Description *
                                </label>
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
                )}
            </div>
        </div>
    );
}

export default EditServicePage;
