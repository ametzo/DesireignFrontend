import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import SelectDropdown from "../../components/SelectDropDown";
import { useHandleClickOutside } from "../../hooks";

const AddSupportModal = ({ isModal, setIsModal, roleId, setSupportList }) => {
    const [formData, setFormData] = useState({
        subject: "",
        userId: "",
        company: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const [error, setError] = useState("");
    const [users, setusers] = useState([]);

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

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchUsers = async () => {
        try {
            setIsPageLoading(true);

            const response = await axiosBase.get(`/customers/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setusers(response?.data);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setError("");

            let response = await axiosBase.post(
                "/supports/add",
                {
                    ...formData,
                },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            setSupportList((prev) => [
                ...prev,
                {
                    ...formData,
                    _id: response.data._id, // Use the newly created role ID
                },
            ]);

            // setUserList((prev) => [...prev, response.data]);
            setIsLoading(false);
            setIsModal({ isEdit: false, isOpen: false });
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed  inset-0 w-full h-full bg-[#434343] bg-opacity-70 flex items-center justify-center z-40">
            {/* Modal Wrapper */}
            <div
                ref={wrapperRef}
                className="bg-mainBg pt-3 shadow-lg max-w-8xl w-full m-3 md:w-5/6 lg:w-2/3 xl:w-2/3 flex flex-col max-h-[90vh] h-[50vh] md:h-[70vh] " // Added max-height and overflow
            >
                <div className=" h-full">
                    {" "}
                    {/* Ensures internal scrolling */}
                    <div className=" p-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isModal.isEdit ? "Edit" : "Add"} New Support
                            </h2>
                            <button
                                className="text-gray-600 hover:text-gray-800 bg-mainBg"
                                onClick={(e) => {
                                    setIsModal({
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
                        <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 h-full">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex justify-between space-x-4 mb-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium ">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            placeholder="Enter Subject Here ....."
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium ">
                                            Select Customer
                                        </label>
                                        <SelectDropdown
                                            data={users}
                                            valueName={"_id"}
                                            displayName={"company"}
                                            placeholder="Select user"
                                            selectedData={formData.userId || ""}
                                            setSelectedData={(val) => {
                                                setFormData((prev) => {
                                                    // Find the user object by matching _id with val
                                                    const user = users.find(
                                                        (user) =>
                                                            user._id === val
                                                    );

                                                    // If user is found, get the company, otherwise default to an empty string
                                                    const company = user
                                                        ? user.company
                                                        : "";

                                                    return {
                                                        ...prev,
                                                        userId: val, // Set the userId
                                                        company: company, // Set the company from the matched user
                                                    };
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <span className="text-sm block text-red-500 mt-2">
                                        {error}
                                    </span>
                                )}
                                <div className="flex justify-end space-x-2 mt-4 border-t border-gray-200 pt-4">
                                    <button
                                        type="button"
                                        className="bg-whiteGray text-customGray border border-customGray hover:opacity-90 px-6 py-2 bg-white"
                                        onClick={(e) => {
                                            setIsModal({
                                                isEdit: false,
                                                isOpen: false,
                                            });
                                        }}
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

export default AddSupportModal;
