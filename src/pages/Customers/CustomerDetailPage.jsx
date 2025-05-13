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
import { BsBuilding, BsDownload } from "react-icons/bs";
import { saveAs } from "file-saver";
import axios from "axios";

function CustomerDetailPage() {
    const [customerData, setcustomerData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [isModal, setIsModal] = useState({
        isOpen: false,
        isEdit: false,
    });
    const jwtToken = localStorage.getItem("jwtToken");
    const { id } = useParams();
    const fetchServiceList = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(`/customers/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setcustomerData(response?.data?.customer);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchServiceList();
    }, []);

    const handleDownload = (fileUrl, fileName) => {
        // Fetch the file as a blob
        fetch(fileUrl)
            .then((response) => response.blob()) // Convert the response to a Blob
            .then((blob) => {
                // Use FileSaver.js to save the file with the specified name
                saveAs(blob, fileName);
            })
            .catch((error) => {
                console.error("Download failed:", error);
            });
    };

    const downloadPdf = async () => {
        try {
            const response = await axiosBase.get(
                `/customers/pdf-download/${id}`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                    responseType: "arraybuffer",
                }
            );

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });
            window.open(URL.createObjectURL(blob), "_blank");
        } catch (err) {
            console.log(err);
        }
    };

    return isLoading ? (
        <PageLoader />
    ) : (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Customer
                    </h2>
                    <button
                        onClick={downloadPdf}
                        class="bg-customGray text-white hover:opacity-90 px-4 py-1 text-xs sm:text-base sm:px-6 sm:py-2"
                    >
                        Download Pdf
                    </button>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 my-5 underline">
                        Company Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-y-auto">
                        <div>
                            <label className="block ">Company</label>
                            <div className="w-full  mt-2">
                                {customerData?.company}
                            </div>
                        </div>
                        <div>
                            <label className="block ">Phone Number </label>
                            <div className="w-full  mt-2">
                                {customerData?.phone}
                            </div>
                        </div>

                        <div>
                            <label className="block ">Email </label>
                            <div className="w-full  mt-2">
                                {customerData?.email}
                            </div>
                        </div>
                        <div>
                            <label className="block ">City</label>
                            <div className="w-full  mt-2">
                                {customerData?.city}
                            </div>
                        </div>
                        <div>
                            <label className="block ">User Status</label>
                            <div className="w-full  mt-2">
                                {customerData?.userStatus}
                            </div>
                        </div>
                    </div>
                    {customerData?.isSupplierDetails ? (
                        <>
                            {" "}
                            <h2 className="text-xl font-bold text-gray-800 my-5 underline">
                                Supplier Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-y-auto">
                                <div>
                                    <label className="block ">
                                        Site Supervisor Name{" "}
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.siteSupervisorName}
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">
                                        Site Supervisor Mobile No{" "}
                                    </label>
                                    <div className="w-full  mt-2">
                                        {
                                            customerData?.siteSupervisorMobileNumber
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">
                                        Site Supervisor Email{" "}
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.siteSupervisorEmail}
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">Accounts</label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsName}
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">
                                        Accounts Email
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsEmail}
                                    </div>
                                </div>{" "}
                                <div>
                                    <label className="block ">
                                        Accounts Mobile No
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsMobileNumber}
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">Accounts2</label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsName2}
                                    </div>
                                </div>
                                <div>
                                    <label className="block ">
                                        Accounts2 Email{" "}
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsEmail2}
                                    </div>
                                </div>{" "}
                                <div>
                                    <label className="block ">
                                        Accounts2 Mobile No{" "}
                                    </label>
                                    <div className="w-full  mt-2">
                                        {customerData?.accountsMobileNumber2}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col  my-10">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-y-auto ">
                                    {customerData?.tradeLicense?.map(
                                        (contract) => {
                                            const fileExtension = contract
                                                .split(".")
                                                .pop()
                                                .toLowerCase();
                                            const fileUrl =
                                                config.SERVER_URL + contract;
                                            const fileName = contract
                                                .split("/")
                                                .pop();
                                            return (
                                                <div
                                                    key={contract}
                                                    className="flex flex-col items-center"
                                                >
                                                    {fileExtension === "pdf" ? (
                                                        // If the file is a PDF
                                                        <div className="w-full h-64 sm:h-48 relative">
                                                            <embed
                                                                src={fileUrl}
                                                                type="application/pdf"
                                                                className="w-full h-full object-contain rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // If it's an image
                                                        <div className="relative w-full h-64 sm:h-48">
                                                            <img
                                                                src={fileUrl}
                                                                alt="Trade License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="pt-2">
                                                        {" "}
                                                        Trade License
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                    {customerData?.vatCertificate?.map(
                                        (contract) => {
                                            const fileExtension = contract
                                                .split(".")
                                                .pop()
                                                .toLowerCase();
                                            const fileUrl =
                                                config.SERVER_URL + contract;
                                            const fileName = contract
                                                .split("/")
                                                .pop();

                                            return (
                                                <div
                                                    key={contract}
                                                    className="flex flex-col items-center"
                                                >
                                                    {fileExtension === "pdf" ? (
                                                        // If the file is a PDF
                                                        <div className="w-full h-64 sm:h-48 relative">
                                                            <embed
                                                                src={fileUrl}
                                                                type="application/pdf"
                                                                className="w-full h-full object-contain rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // If it's an image
                                                        <div className="relative w-full h-64 sm:h-48">
                                                            <img
                                                                src={fileUrl}
                                                                alt="Trade License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="pt-2">
                                                        {" "}
                                                        Vat Certificate
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}{" "}
                                    {customerData?.contract?.map((contract) => {
                                        const fileExtension = contract
                                            .split(".")
                                            .pop()
                                            .toLowerCase();
                                        const fileUrl =
                                            config.SERVER_URL + contract;
                                        const fileName = contract
                                            .split("/")
                                            .pop();
                                        return (
                                            <div
                                                key={contract}
                                                className="flex flex-col items-center"
                                            >
                                                {fileExtension === "pdf" ? (
                                                    // If the file is a PDF
                                                    <div className="w-full h-64 sm:h-48 relative">
                                                        <embed
                                                            src={fileUrl}
                                                            type="application/pdf"
                                                            className="w-full h-full object-contain rounded-lg"
                                                        />
                                                        <div
                                                            className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                            onClick={() =>
                                                                handleDownload(
                                                                    fileUrl,
                                                                    fileName
                                                                )
                                                            }
                                                        >
                                                            <BsDownload />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // If it's an image
                                                    <div className="relative w-full h-64 sm:h-48">
                                                        <img
                                                            src={fileUrl}
                                                            alt="Trade License"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <div
                                                            className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                            onClick={() =>
                                                                handleDownload(
                                                                    fileUrl,
                                                                    fileName
                                                                )
                                                            }
                                                        >
                                                            <BsDownload />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="pt-2">
                                                    {" "}
                                                    Contract
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {customerData?.lto?.map(
                                        (lto) => {
                                            const fileExtension = lto
                                                .split(".")
                                                .pop()
                                                .toLowerCase();
                                            const fileUrl =
                                                config.SERVER_URL + lto;
                                            const fileName = lto
                                                .split("/")
                                                .pop();

                                            return (
                                                <div
                                                    key={lto}
                                                    className="flex flex-col items-center"
                                                >
                                                    {fileExtension === "pdf" ? (
                                                        // If the file is a PDF
                                                        <div className="w-full h-64 sm:h-48 relative">
                                                            <embed
                                                                src={fileUrl}
                                                                type="application/pdf"
                                                                className="w-full h-full object-contain rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // If it's an image
                                                        <div className="relative w-full h-64 sm:h-48">
                                                            <img
                                                                src={fileUrl}
                                                                alt="Trade License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-2 right-2 bg-customGray text-white px-3 py-3 rounded-lg hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        fileUrl,
                                                                        fileName
                                                                    )
                                                                }
                                                            >
                                                                <BsDownload />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="pt-2">
                                                        {" "}
                                                        LTO
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}{" "}
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerDetailPage;
