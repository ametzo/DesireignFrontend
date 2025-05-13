import React from "react";
import { formatDate } from "../../utils";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";
import axiosBase from "../../axios";
import { useSelector } from "react-redux";
import { MdRemoveRedEye } from "react-icons/md";
import { config } from "../../constants";
import { FiEye } from "react-icons/fi";
const activities = [
    { name: "isWatering", label: "Watering" },
    { name: "isTrimming", label: "Trimming" },
    { name: "isPestCheck", label: "Checking Pest And Disease Infection" },
    { name: "isFertilizer", label: "Fertilizer Application" },
    { name: "isToppingUp", label: "Topping Up And Soil Mix" },
];

function CustomerTableRow({ report, index, setReports }) {
    return (
        <tr key={index} className="table-row">
            <td className="p-1 text-center border border-gray-700">
                {index + 1}
            </td>{" "}
            {/* <td className="p-1 text-center border border-gray-700">
                {report?.customerDetail?.company}
            </td>{" "}
            <td className="p-1 text-center border border-gray-700">
                {report.serviceDetail?.project}
            </td> */}
            <td className="p-1 text-center border border-gray-700">
                {report.projectNo}
            </td>
            <td className="p-1 text-center border border-gray-700">
                {formatDate(report.serviceDate)}
            </td>
            <td className="p-1 text-center border border-gray-700">
                {report.status}
            </td>
            <td className="p-1 text-center border border-gray-700">
                {report.workerDetails
                    .map((workerDetail) => workerDetail?.employeeName)
                    .filter(Boolean)
                    .join(", ")}
            </td>
            {/* Loop through activities and show corresponding values */}
            {activities.map((activity) => (
                <td
                    key={activity.name}
                    className="p-1 text-center border border-gray-700"
                >
                    {report[activity.name] ? "Yes" : "No"}
                </td>
            ))}
            <td className="p-1 text-center border border-gray-700">
                {report.serviceTimeIn}
            </td>
            <td className="p-1 text-center border border-gray-700">
                {report.serviceTimeOut}
            </td>
            <td className="p-1 text-center border border-gray-700 relative">
                <a
                    href={config.SERVER_URL + report?.image}
                    target="_blank"
                    download
                    title="Download Image"
                    className="flex items-center justify-center"
                >
                    {/* Image */}
                    <img
                        src={config.SERVER_URL + report?.image}
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
                {report.signedBy}
            </td>
            <td className="p-1 text-center border border-gray-700">
                {report.signedTime ? formatDate(report.signedTime) : ""}
            </td>
        </tr>
    );
}

export default CustomerTableRow;
