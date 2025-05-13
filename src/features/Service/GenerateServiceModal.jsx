import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosBase from "../../axios";
import MultipleSelectDropdown from "../../components/MultipleSelectDropdown";
import SelectDropdown from "../../components/SelectDropDown";
import { useHandleClickOutside } from "../../hooks";

const generateUserId = () => {
    // Generate a 7-digit number by combining the current timestamp and random value
    return Math.floor(Math.random() * 9000000) + 1000000; // Random 7-digit number
};

const GenerateServiceModal = ({
    setIsModal,
    setGenerateServices,
    isModal,
    workers,
}) => {
    const [formData, setFormData] = useState({
        projectNo: "",
        serviceDate: "",
        status: "",
        servicedBy: [],
        serviceTimeIn: "",
        serviceTimeOut: "",
        isWatering: false,
        isTrimming: false,
        isPestCheck: false,
        isFertilizer: false,
        isToppingUp: false,
    });

    const { id } = useParams();

    const activities = [
        { name: "isWatering", label: "Watering" },
        { name: "isTrimming", label: "Trimming" },
        { name: "isPestCheck", label: "Pest Check" },
        { name: "isFertilizer", label: "Fertilizer" },
        { name: "isToppingUp", label: "Topping Up" },
    ];

    <div className="">
        Activities
        <div className="grid grid-cols-5 pt-5 gap-6">
            {activities.map((activity) => (
                <div
                    key={activity.name}
                    className="flex flex-col items-start space-y-2"
                >
                    <label className="block text-sm font-medium">
                        {activity.label}
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">No</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name={activity.name}
                                checked={formData[activity.name]}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        [activity.name]: isChecked,
                                    }));
                                }}
                                className="sr-only"
                            />
                            <div className="w-11 h-5 bg-white rounded-full"></div>
                            <div
                                className={`${
                                    formData[activity.name]
                                        ? "translate-x-5 bg-blue-500"
                                        : "bg-gray-500"
                                } absolute left-0 top-0 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out`}
                            ></div>
                        </label>
                        <span className="text-sm text-gray-600">Yes</span>
                    </div>
                </div>
            ))}
        </div>
    </div>;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [roles, setRoles] = useState([
        { name: "pending" },
        { name: "completed" },
        { name: "on-going" },
    ]);

    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () =>
        setIsModal({ isEdit: false, isOpen: false })
    );
    const jwtToken = localStorage.getItem("jwtToken");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let response = await axiosBase.post(
                "/services/generate/add",
                { serviceId: id, ...formData },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            setGenerateServices((prev) => [...prev, response.data?.newService]);

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
            {" "}
            <div
                ref={wrapperRef}
                className="bg-mainBg pt-3 shadow-lg max-w-8xl w-full m-3 md:w-5/6 lg:w-2/3 xl:w-2/3 flex flex-col max-h-[90vh]"
            >
                <div className=" overflow-y-auto ">
                    <div className=" p-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Generate Service
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
                    <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium ">
                                            Project No.{" "}
                                            <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="projectNo"
                                            value={formData.projectNo}
                                            onChange={handleInputChange}
                                            placeholder="Enter  number"
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium ">
                                            Service Date
                                            <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="serviceDate"
                                            className="w-full p-2 border border-gray-700"
                                            value={formData.serviceDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>{" "}
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium  mt-4">
                                            Service Start Time{" "}
                                            <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="serviceTimeIn"
                                            value={formData.serviceTimeIn}
                                            onChange={handleInputChange}
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium ">
                                            Status
                                            <span className="text-red">*</span>
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            required
                                        >
                                            <option value="">Select</option>

                                            {roles.map((role) => {
                                                return (
                                                    <option value={role?.name}>
                                                        {role?.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="flex flex-col pt-3 font-medium ">
                                        <label className="block text-sm font-medium ">
                                            Serviced By
                                            <span className="text-red">*</span>
                                        </label>

                                        <MultipleSelectDropdown
                                            data={workers}
                                            valueName={"_id"}
                                            displayName={"employeeName"}
                                            selectedData={
                                                formData.servicedBy || []
                                            }
                                            setSelectedData={(selApis) =>
                                                setFormData((prev) => {
                                                    return {
                                                        ...prev,
                                                        ["servicedBy"]: selApis,
                                                    };
                                                })
                                            }
                                            // randomIndex={"connectedApis"}
                                            // disabled={!isEditPermission}
                                        />
                                    </div>{" "}
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium  mt-4">
                                            Service End Time{" "}
                                            <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="serviceTimeOut"
                                            value={formData.serviceTimeOut}
                                            onChange={handleInputChange}
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pb-5  font-medium text-gray-800">
                                Activities
                                <div className="grid grid-cols-5 pt-5 gap-6">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.name}
                                            className="flex flex-col items-start space-y-2"
                                        >
                                            <label className="block text-sm font-medium">
                                                {activity.label}
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
                                                        name={activity.name}
                                                        checked={
                                                            formData[
                                                                activity.name
                                                            ]
                                                        }
                                                        onChange={(e) => {
                                                            const isChecked =
                                                                e.target
                                                                    .checked;
                                                            setFormData(
                                                                (prevData) => ({
                                                                    ...prevData,
                                                                    [activity.name]:
                                                                        isChecked,
                                                                })
                                                            );
                                                        }}
                                                        className="sr-only"
                                                    />
                                                    <div className="w-11 h-5 bg-white rounded-full"></div>
                                                    <div
                                                        className={`${
                                                            formData[
                                                                activity.name
                                                            ]
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
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    className="bg-white border border-customGray text-customGray hover:opacity-90 px-6 py-2"
                                    onClick={(e) => {
                                        setIsModal({
                                            isEdit: false,
                                            isOpen: false,
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-customGray text-white hover:opacity-90 px-6 py-2"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default GenerateServiceModal;
