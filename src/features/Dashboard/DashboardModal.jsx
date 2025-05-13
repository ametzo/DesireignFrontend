import React, { useState, useRef } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { RiServiceFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHandleClickOutside } from "../../hooks";

const dashboardData = [
    {
        icon: FaUserFriends,
        title: "User Roles",
        link: "user-roles",
        roleNo: 1001,
    },
    { icon: FaUserPlus, title: "Sub Users", link: "subUser", roleNo: 1002 },
    {
        icon: BsFillFileEarmarkSpreadsheetFill,
        title: "Leads",
        link: "leads",
        roleNo: 1003,
    },
    {
        icon: RiCustomerService2Line,
        title: "Customers",
        link: "customer",
        roleNo: 1004,
    },
    { icon: GrUserWorker, title: "Workers", link: "worker", roleNo: 1005 },
    { icon: RiServiceFill, title: "Services", link: "service", roleNo: 1006 },
    { icon: TbReportSearch, title: "Reports", link: "reports", roleNo: 1007 },
    { icon: BiSupport, title: "Support", link: "support", roleNo: 1008 },
];

function DashboardModal({ isDashboardModalOpen, setIsDashboardModalOpen }) {
    const { roles, admin } = useSelector((state) => state.admin); // Access roles and admin state

    const wrapperRef = useRef();

    // Function to check if any role has the necessary permissions for a specific card
    const hasPermissionForCard = (roleNo) => {
        if (roles) {
            return roles.some(
                (role) =>
                    role?.stepNumber === roleNo &&
                    role?.permissions.includes("view")
            );
        }
        return false;
    };

    // Filter cards based on role permissions
    const filteredData = dashboardData.filter((item) =>
        hasPermissionForCard(item?.roleNo)
    );

    const toggleDashboardModal = () => {
        setIsDashboardModalOpen(!isDashboardModalOpen);
    };

    useHandleClickOutside(wrapperRef, () =>
        setIsDashboardModalOpen(!isDashboardModalOpen)
    );

    return (
        <div
            className={`fixed inset-0 w-full h-full bg-[#434343] bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500 ease-in-out ${
                isDashboardModalOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                ref={wrapperRef}
                className={`bg-mainBg mx-10 flex flex-col items-center max-h-[90vh] transition-all duration-500 ease-in-out transform ${
                    isDashboardModalOpen ? "scale-100" : "scale-10"
                }`}
            >
                <div className=" px-16 py-16 items-center overflow-y-auto ">
                    <div className="flex flex-wrap justify-center  ">
                        {" "}
                        {filteredData.map((item, index) => (
                            <Link
                                key={item.roleNo} // Add a key prop to avoid warning
                                to={item?.link}
                                className="w-full  md:w-1/2 lg:w-1/4 p-2"
                            >
                                <div
                                    className="bg-white p-3 flex flex-col items-center cursor-pointer transform hover:opacity-90 transition-all duration-300"
                                    onClick={toggleDashboardModal}
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <p className="text-4xl text-white">
                                            {/* Corrected icon reference */}
                                            <item.icon className="w-[25px] h-[25px] text-black" />
                                        </p>
                                    </div>{" "}
                                    <h3 className="text-xl  text-CustomGray text-center">
                                        {item?.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardModal;
