import React, { useEffect, useRef, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import { useHandleClickOutside } from "../../hooks";

const generateUserId = () => {
    // Generate a 7-digit number by combining the current timestamp and random value
    return Math.floor(Math.random() * 9000000) + 1000000; // Random 7-digit number
};

const CustomerEmployeeModal = ({
    setIsModal,
    companyEmployee,
    setCompanyEmployees,
    isModal,
    customerId,
}) => {
    const [formData, setFormData] = useState({
        name: companyEmployee?.name || "admin",
        designation: companyEmployee?.designation || "",
        email: companyEmployee?.email || "",
        isLoggin: companyEmployee?.isLoggin || false,
        phone: companyEmployee?.phone || "",
        userName: companyEmployee?.userName || "",
        password: "",
    });
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");

    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () =>
        setIsModal({ isEdit: false, isOpen: false })
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        setIsLoading(true);
        setError(""); // Reset any previous errors

        try {
            if (isModal.isEdit) {
                // Editing an existing employee
                let response = await axiosBase.patch(
                    `/customers/employee/update/${companyEmployee?._id}`,
                    { ...formData, customerId },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );
                const updatedUser = response.data?.customer;

                setCompanyEmployees((prev) => {
                    return prev.map((user) =>
                        user._id === updatedUser._id
                            ? { ...user, ...updatedUser }
                            : user
                    );
                });
            } else {
                // Adding a new employee
                let response = await axiosBase.post(
                    "/customers/employee/add",
                    { ...formData, customerId },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );
                setCompanyEmployees((prev) => [
                    ...prev,
                    response.data?.customer,
                ]);
            }

            // Close the modal after successful submission
            setIsModal({ isEdit: false, isOpen: false });
        } catch (err) {
            setError(err?.response?.data?.error || "An error occurred");
            console.error("Error during form submission:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-[#434343] bg-opacity-70 flex items-center justify-center z-40  ">
            <div
                ref={wrapperRef}
                className="bg-mainBg pt-3 shadow-lg max-w-8xl w-full m-3 md:w-5/6 lg:w-2/3 xl:w-2/3 flex flex-col  max-h-[90vh]"
            >
                {" "}
                <div className=" overflow-y-auto ">
                    <div className=" p-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isModal.isEdit ? "Edit" : "Add"} Company
                                Employee
                            </h2>
                            <button
                                className="text-gray-600 hover:text-gray-800 bg-mainBg"
                                onClick={() =>
                                    setIsModal({ isEdit: false, isOpen: false })
                                }
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    {/* <hr className="border-t border-gray-300" /> */}
                    {isPageLoading ? (
                        <PageLoader />
                    ) : (
                        <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Full Name{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter full name"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Phone (with country code){" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter phone number with country code"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <label className="block text-sm font-medium ">
                                                Is Loggin Required{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm text-gray-600">
                                                    No
                                                </span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="isLoggin"
                                                        checked={
                                                            formData.isLoggin
                                                        }
                                                        onChange={(e) => {
                                                            const isChecked =
                                                                e.target
                                                                    .checked;
                                                            setFormData(
                                                                (prevData) => ({
                                                                    ...prevData,
                                                                    isLoggin:
                                                                        isChecked,
                                                                    // If 'isLoggin' is false, set 'userName' and 'password' to null
                                                                    userName:
                                                                        isChecked
                                                                            ? prevData.userName
                                                                            : null,
                                                                    password:
                                                                        isChecked
                                                                            ? prevData.password
                                                                            : null,
                                                                })
                                                            );
                                                        }}
                                                        className="sr-only"
                                                    />
                                                    <div className="w-11 h-5 bg-white rounded-full"></div>
                                                    <div
                                                        className={`${
                                                            formData.isLoggin
                                                                ? "translate-x-5 bg-blue-500"
                                                                : "bg-gray-500"
                                                        } absolute left-0 top-0 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out`}
                                                    ></div>
                                                </label>
                                                <span className="text-sm text-gray-600">
                                                    Yes
                                                </span>
                                            </div>
                                        </div>

                                        {formData.isLoggin && (
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium ">
                                                    Password{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </label>
                                                <div class="mb-6 relative w-full">
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        value={
                                                            formData.password
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        placeholder="Enter password"
                                                        className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                    />{" "}
                                                    <div
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <FiEyeOff className="text-customGray" />
                                                        ) : (
                                                            <LuEye className="text-customGray" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Designation{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="designation"
                                                value={formData.designation}
                                                onChange={handleInputChange}
                                                placeholder="Enter designation"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Email{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter email address"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>{" "}
                                        {formData.isLoggin && (
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium ">
                                                    User Name{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    value={formData.userName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter userName"
                                                    className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {error && (
                                    <span className="text-sm block text-red-500 mt-2">
                                        {error}
                                    </span>
                                )}
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        className="bg-white border border-customGray text-customGray hover:opacity-90 px-6 py-2"
                                        onClick={() =>
                                            setIsModal({
                                                isEdit: false,
                                                isOpen: false,
                                            })
                                        }
                                    >
                                        Cancel
                                    </button>
                                    {isLoading ? (
                                        <BtnLoader />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-customGray text-white hover:opacity-90 px-6 py-2"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerEmployeeModal;
