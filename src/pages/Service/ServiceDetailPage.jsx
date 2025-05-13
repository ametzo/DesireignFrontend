import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axiosBase from "../../axios";
import { config } from "../../constants";
import GenerateServiceModal from "../../features/Service/GenerateServiceModal";
import { GoDownload } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { formatDate } from "../../utils";
import { PageLoader } from "../../components";

function ServiceDetailPage() {
    const [serviceData, setServiceData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [generatedServices, setGenerateServices] = useState([]);
    const [workers, setWorkers] = useState([]);
    const activities = [
        { name: "isWatering", label: "Is Watering" },
        { name: "isTrimming", label: "Is Trimming" },
        { name: "isPestCheck", label: "Is Pest Check" },
        { name: "isFertilizer", label: "Is Fertilizer" },
        { name: "isToppingUp", label: "Is Topping Up" },
    ];

    const [isModal, setIsModal] = useState({
        isOpen: false,
        isEdit: false,
    });
    const jwtToken = localStorage.getItem("jwtToken");
    const { id } = useParams();
    const fetchServiceList = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(`/services/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setServiceData(response?.data?.service);
            setGenerateServices(response?.data?.generatedServices || []);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchWorkerList = async () => {
        try {
            setIsLoading(true);

            const response = await axiosBase.get(`/workers/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setWorkers(response?.data);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWorkerList();
    }, []);

    useEffect(() => {
        fetchServiceList();
    }, []);

    return isLoading ? (
        <PageLoader />
    ) : (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Service For {serviceData?.customerId?.name}
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto">
                        <div>
                            <label className="block ">Customer *</label>
                            <div className="w-full p-2 border border-gray-700 mt-2">
                                {serviceData?.customerId?.company}
                            </div>
                        </div>
                        <div>
                            <label className="block ">Project *</label>
                            <div className="w-full p-2 border border-gray-700 mt-2">
                                {serviceData?.project}
                            </div>
                        </div>

                        <div>
                            <label className="block ">Start Date *</label>
                            <div className="w-full p-2 border border-gray-700 mt-2">
                                {formatDate(serviceData?.startDate)}
                            </div>
                        </div>
                        <div>
                            <label className="block ">End Date *</label>
                            <div className="w-full p-2 border border-gray-700 mt-2">
                                {formatDate(serviceData?.endDate)}
                            </div>
                        </div>
                        <div>
                            <label className="block ">
                                Service Description *
                            </label>
                            <div className="w-full p-2 border border-gray-700 mt-2">
                                {serviceData?.description}
                            </div>
                        </div>
                    </div>

                    {/* Generated Services Section */}
                    <div class=" px-6 p-6 mt-5">
                        <div class="flex flex-row justify-between items-center mb-4">
                            <h3 className="font-bold text-lg py-3">
                                Generated Services:
                            </h3>
                            <button
                                to="add"
                                class="bg-customGray text-white hover:opacity-90 px-4 py-1 text-xs sm:text-base sm:px-6 sm:py-2"
                                onClick={(e) => {
                                    setIsModal({
                                        isOpen: true,
                                        isEdit: false,
                                    });
                                }}
                            >
                                Generate Service +
                            </button>

                            {isModal?.isOpen && (
                                <GenerateServiceModal
                                    setIsModal={setIsModal}
                                    isModal={isModal}
                                    setGenerateServices={setGenerateServices}
                                    workers={workers}
                                />
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="leads-table">
                                <thead className="table-header">
                                    <tr>
                                        <th>No.</th>
                                        <th>Project No.</th>
                                        <th>Service Date</th>
                                        <th>Service Status</th>
                                        <th>Serviced By</th>

                                        {/* Main "Activities" Header */}
                                        {activities.map((activity) => (
                                            <th
                                                key={activity.name}
                                                className="text-center"
                                            >
                                                {activity.label}
                                            </th>
                                        ))}

                                        <th>Service Time In</th>
                                        <th>Service Time Out</th>
                                        <th>Sign</th>
                                        <th>Signed By</th>
                                        <th>Signed Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generatedServices?.map(
                                        (service, index) => (
                                            <tr
                                                key={index}
                                                className="table-row"
                                            >
                                                <td className="p-1 text-center border border-gray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.projectNo}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {formatDate(
                                                        service.serviceDate
                                                    )}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.status}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.servicedBy
                                                        .map(
                                                            (serv) =>
                                                                workers.find(
                                                                    (wk) =>
                                                                        wk._id.toString() ===
                                                                        serv?._id
                                                                )?.employeeName
                                                        )
                                                        .filter(Boolean) // Removes undefined values
                                                        .join(", ")}
                                                </td>

                                                {/* Loop through activities and show corresponding values */}
                                                {activities.map((activity) => (
                                                    <td
                                                        key={activity.name}
                                                        className="p-1 text-center border border-gray-700"
                                                    >
                                                        {service[activity.name]
                                                            ? "Yes"
                                                            : "No"}
                                                    </td>
                                                ))}

                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.serviceTimeIn}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.serviceTimeOut}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700 relative">
                                                    <a
                                                        href={
                                                            config.SERVER_URL +
                                                            service?.image
                                                        }
                                                        target="_blank"
                                                        download
                                                        title="Download Image"
                                                        className="flex items-center justify-center"
                                                    >
                                                        {/* Image */}
                                                        <img
                                                            src={
                                                                config.SERVER_URL +
                                                                service?.image
                                                            }
                                                            alt="signature"
                                                            width="130px"
                                                            height="70px"
                                                            className="mr-2"
                                                        />

                                                        {/* Download Icon on top of the image */}
                                                        <FiEye className="absolute justify-center text-2xl bg-white text-red-800 p-1 rounded-full shadow-md" />
                                                    </a>
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.signedBy || "N/A"}
                                                </td>
                                                <td className="p-1 text-center border border-gray-700">
                                                    {service.signedTime
                                                        ? formatDate(
                                                              service.signedTime
                                                          )
                                                        : "N/A"}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetailPage;
