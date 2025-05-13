import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axios";
import { MdDelete } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import CustomerEmployeeModal from "../../features/Customer/CustomerEmployeeModal";
import { BtnLoader, PageLoader } from "../../components";
import SelectDropdown from "../../components/SelectDropDown";

function AddCustomerPage() {
    const [formData, setFormData] = useState({
        company: "",
        phone: "",
        email: "",
        city: "",
        assigned: "",
        // userStatus: "not-contacted-yet",
    });

    const [companyEmployees, setCompanyEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);

    const [isModal, setIsModal] = useState({
        isOpen: false,
        isEdit: false,
        employeeIndex: null, // This tracks the index of the employee being edited
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const removeRow = (index) => {
        setCompanyEmployees((prev) => prev.filter((_, i) => i !== index));
    };

    const fetchUsers = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/auth/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setAdmins(response.data);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let response = await axiosBase.post(
                "/customers/add",
                { ...formData },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            navigate(`/customer/${response.data?.customer?._id}/edit`);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return isPageLoading ? (
        <PageLoader />
    ) : (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center  p-4 ">
                    <h2 className="flex justify-start text-2xl font-bold text-gray-800 text-center w-full">
                        Add New Customer
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block  mb-2">Company *</label>
                                <input
                                    type="text"
                                    name="company"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block  mb-2">Phone *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block  mb-2">Email *</label>
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
                                <label className="block  mb-2">City </label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div>
                                <label className="block  mb-2">
                                    User Status *
                                </label>
                                <select
                                    name="userStatus"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.userStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="not-contacted-yet">
                                        Not contacted yet
                                    </option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in-Progress">
                                        In Progress
                                    </option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>{" "} */}
                            <div>
                                <label className="block  mb-2">
                                    Sub Users *
                                </label>
                                <SelectDropdown
                                    data={admins}
                                    valueName={"_id"}
                                    displayName={"name"}
                                    placeholder="Select sub user"
                                    selectedData={formData.assigned || ""}
                                    setSelectedData={(val) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                ["assigned"]: val,
                                            };
                                        });
                                    }}
                                />{" "}
                            </div>
                        </div>
                        {error && (
                            <div className="mt-4 text-red-600 text-center">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-center mt-8">
                            {isLoading ? (
                                <BtnLoader />
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-customGray text-white w-full font-semibold px-6 py-3 hover:opacity-90"
                                >
                                    SAVE
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>{" "}
        </div>
    );
}

export default AddCustomerPage;
