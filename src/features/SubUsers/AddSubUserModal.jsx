import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import { useHandleClickOutside } from "../../hooks";

const generateUserId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letterPart = "";
    for (let i = 0; i < 3; i++) {
        letterPart += letters.charAt(
            Math.floor(Math.random() * letters.length)
        );
    }
    const digits = Math.floor(Math.random() * 9000) + 1000; // Random 4 digits between 1000 and 9999
    return letterPart + digits;
};

const AddSubUserMOdal = ({
    setAddUserModal,
    user,
    setUserList,
    addUserModal,
}) => {
    const [formData, setFormData] = useState({
        name: user?.name || "admin",
        phoneNumber: user?.phoneNumber || "+971",
        email: user?.email || "",
        userId: user?.userId || generateUserId(),
        password: "",
        role: user?.role?._id || user?.role || "",
        adminRole: user?.adminRole || "",
    });
    const [isPageLoading, setIsPageLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [roles, setRoles] = useState([]);

    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () =>
        setAddUserModal({ isEdit: false, isOpen: false })
    );
    const jwtToken = localStorage.getItem("jwtToken");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchroleList = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/roles/all/role-names`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setRoles(response?.data);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchroleList();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setError("");

            if (addUserModal.isEdit) {
                let response = await axiosBase.patch(
                    `/auth/update/single/${user?._id}`,
                    { ...formData },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );
                const updatedUser = response.data;

                setUserList((prev) => {
                    const updatedList = prev.map((user) =>
                        user._id === updatedUser._id
                            ? { ...user, ...updatedUser?.admin }
                            : user
                    );
                    return updatedList;
                });
            } else {
                let response = await axiosBase.post(
                    "/auth/add",
                    { ...formData },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );

                setUserList((prev) => [...prev, response.data]);
            }
            setIsLoading(false);
            setAddUserModal({ isEdit: false, isOpen: false });
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-[#434343] bg-opacity-70 flex items-center justify-center z-40  ">
            {" "}
            <div
                ref={wrapperRef}
                className="bg-mainBg pt-3 shadow-lg max-w-8xl w-full m-3 md:w-5/6 lg:w-2/3 xl:w-2/3 flex flex-col  max-h-[90vh] "
            >
                <div className=" overflow-y-auto ">
                    <div className="p-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {addUserModal.isEdit ? "Edit" : "Add"} Subusers
                            </h2>
                            <button
                                className="text-gray-600 hover:text-gray-800 bg-mainBg"
                                onClick={(e) => {
                                    setAddUserModal({
                                        isEdit: false,
                                        isOpen: false,
                                    });
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    {/* <hr className="border-t border-gray-300" /> */}
                    {isPageLoading ? (
                        <PageLoader />
                    ) : (
                        <div className="bg-mainBg p-4 flex-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
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
                                                value={formData?.name}
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
                                                name="phoneNumber"
                                                value={formData?.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter phone number with country code"
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
                                                value={formData?.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter email address"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>{" "}
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Type
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="adminRole"
                                                value={formData.adminRole}
                                                onChange={handleInputChange}
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="super-admin">
                                                    Super Admin
                                                </option>{" "}
                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                User ID{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="userId"
                                                value={formData?.userId}
                                                onChange={handleInputChange}
                                                placeholder="Enter user ID"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                Password{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData?.password}
                                                onChange={handleInputChange}
                                                placeholder="Enter password"
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                // required={addUserModal.isEdit === false}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium ">
                                                User Role{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                                required
                                            >
                                                <option value="">
                                                    Select Role
                                                </option>

                                                {roles.map((role) => {
                                                    return (
                                                        <option
                                                            value={role?._id}
                                                        >
                                                            {role?.roleName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>{" "}
                                    </div>
                                </div>{" "}
                                {error && (
                                    <span className="text-sm block text-red-500 mt-2">
                                        {error}
                                    </span>
                                )}
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        className="bg-white border border-customGray text-customGray hover:opacity-90 px-6 py-2"
                                        onClick={(e) => {
                                            setAddUserModal({
                                                isEdit: false,
                                                isOpen: false,
                                            });
                                        }}
                                    >
                                        Cancel
                                    </button>{" "}
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
            {/* </div> */}
        </div>
    );
};

export default AddSubUserMOdal;
